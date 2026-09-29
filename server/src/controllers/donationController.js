import crypto from "node:crypto";
import Donation from "../models/Donation.js";
import { sendDonationAcknowledgementEmail } from "../services/emailService.js";
import {
  razorpay,
  razorpayConfigured,
  razorpayKeyId,
  razorpayKeySecret,
} from "../config/razorpay.js";

function validateDonation(body) {
  const required = ["donorName", "email", "phone", "pinCode", "address", "city", "state"];
  const missing = required.filter((field) => !String(body[field] || "").trim());
  if (missing.length) return `Missing required fields: ${missing.join(", ")}`;

  const email = String(body.email).trim().toLowerCase();
  if (!/^\S+@\S+\.\S+$/.test(email)) return "Please provide a valid email address.";
  if (!/^\d{10}$/.test(String(body.phone).replace(/\D/g, "")))
    return "Please provide a valid 10-digit phone number.";
  if (!/^\d{6}$/.test(String(body.pinCode).trim()))
    return "Please provide a valid 6-digit PIN code.";

  const amount = Number(body.amount);
  if (!Number.isInteger(amount) || amount < 1)
    return "Please provide a valid donation amount.";
  if (amount > 10000000) return "Donation amount is too large.";
  return null;
}

function isSameSignature(expected, received) {
  const expectedBuffer = Buffer.from(expected);
  const receivedBuffer = Buffer.from(received || "");
  return (
    expectedBuffer.length === receivedBuffer.length &&
    crypto.timingSafeEqual(expectedBuffer, receivedBuffer)
  );
}

export async function listAdminDonations(req, res, next) {
  try {
    const donations = await Donation.find().sort({ createdAt: -1 }).lean();
    const paidDonations = donations.filter((donation) => donation.status === "PAID");
    const pendingDonations = donations.filter((donation) => donation.status === "PENDING");
    const failedDonations = donations.filter((donation) => donation.status === "FAILED");
    const donorEmails = new Set(paidDonations.map((donation) => donation.email));

    return res.json({
      success: true,
      stats: {
        totalAmount: paidDonations.reduce((sum, donation) => sum + donation.amount, 0),
        pendingAmount: pendingDonations.reduce((sum, donation) => sum + donation.amount, 0),
        failedAmount: failedDonations.reduce((sum, donation) => sum + donation.amount, 0),
        totalDonations: donations.length,
        paidDonations: paidDonations.length,
        pendingDonations: pendingDonations.length,
        failedDonations: failedDonations.length,
        uniqueDonors: donorEmails.size,
      },
      donations: donations.map((donation) => ({
        id: donation._id,
        donorName: donation.donorName,
        email: donation.email,
        phone: donation.phone,
        address: donation.address,
        city: donation.city,
        state: donation.state,
        pinCode: donation.pinCode,
        amount: donation.amount,
        currency: donation.currency,
        status: donation.status,
        razorpayOrderId: donation.razorpayOrderId,
        razorpayPaymentId: donation.razorpayPaymentId,
        createdAt: donation.createdAt,
        paidAt: donation.paidAt,
      })),
    });
  } catch (error) {
    next(error);
  }
}

export async function createDonationOrder(req, res, next) {
  try {
    if (!razorpayConfigured)
      return res.status(503).json({ success: false, message: "Payment gateway is not configured." });

    const validationError = validateDonation(req.body);
    if (validationError)
      return res.status(400).json({ success: false, message: validationError });

    const donation = await Donation.create({
      donorName: String(req.body.donorName).trim(),
      email: String(req.body.email).trim().toLowerCase(),
      phone: String(req.body.phone).replace(/\D/g, ""),
      pinCode: String(req.body.pinCode).trim(),
      address: String(req.body.address).trim(),
      city: String(req.body.city).trim(),
      state: String(req.body.state).trim(),
      amount: Number(req.body.amount),
    });

    try {
      const order = await razorpay.orders.create({
        amount: donation.amount * 100,
        currency: donation.currency,
        receipt: `don_${donation._id}`,
        notes: { donorName: donation.donorName, email: donation.email },
      });
      donation.razorpayOrderId = order.id;
      await donation.save();

      return res.status(201).json({
        success: true,
        donationId: donation._id,
        keyId: razorpayKeyId,
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
      });
    } catch (error) {
      donation.status = "FAILED";
      await donation.save();
      if (error.statusCode === 401 || error.error?.code === "BAD_REQUEST_ERROR") {
        return res.status(502).json({
          success: false,
          message: "Razorpay rejected the configured credentials. Check the matching test key ID and secret in server/.env.",
        });
      }
      throw error;
    }
  } catch (error) {
    next(error);
  }
}

export async function verifyDonationPayment(req, res, next) {
  try {
    const {
      donationId,
      razorpay_order_id: orderId,
      razorpay_payment_id: paymentId,
      razorpay_signature: signature,
    } = req.body;
    const donation = await Donation.findById(donationId);

    if (!donation || donation.razorpayOrderId !== orderId)
      return res.status(400).json({ success: false, message: "Donation order could not be found." });

    const expectedSignature = crypto
      .createHmac("sha256", razorpayKeySecret)
      .update(`${orderId}|${paymentId}`)
      .digest("hex");

    if (!isSameSignature(expectedSignature, signature)) {
      donation.status = "FAILED";
      await donation.save();
      return res.status(400).json({ success: false, message: "Payment verification failed." });
    }

    donation.status = "PAID";
    donation.razorpayPaymentId = paymentId;
    donation.paidAt = new Date();
    await donation.save();

    let emailSent = true;
    try {
      await sendDonationAcknowledgementEmail({
        email: donation.email,
        fullName: donation.donorName,
        amount: donation.amount,
        paymentId,
      });
    } catch (emailError) {
      emailSent = false;
      if (process.env.NODE_ENV !== "production") console.error(emailError.message);
    }

    return res.json({
      success: true,
      emailSent,
      message: "Donation completed successfully.",
    });
  } catch (error) {
    next(error);
  }
}

export async function failDonationPayment(req, res, next) {
  try {
    const donation = await Donation.findById(req.body.donationId);
    if (donation && donation.status === "PENDING") {
      donation.status = "FAILED";
      await donation.save();
    }
    return res.json({ success: true });
  } catch (error) {
    next(error);
  }
}
