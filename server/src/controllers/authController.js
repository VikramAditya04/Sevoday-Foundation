import bcrypt from "bcryptjs";
import { cloudinary, isConfigured } from "../config/cloudinary.js";
import User from "../models/User.js";
import { sendRegistrationReceivedEmail } from "../services/emailService.js";
import generateToken, { cookieOptions } from "../utils/generateToken.js";
import {
  normalizeEmail,
  safeUser,
  validateRegistration,
} from "../utils/validators.js";

async function uploadProfilePhoto(file) {
  if (!file || !isConfigured) return null;
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "sevoday/members" },
      (error, result) => (error ? reject(error) : resolve(result.secure_url)),
    );
    stream.end(file.buffer);
  });
}

export async function register(req, res, next) {
  try {
    const validationError = validateRegistration(req.body);
    if (validationError)
      return res.status(400).json({ success: false, message: validationError });
    const email = normalizeEmail(req.body.email);
    const existing = await User.findOne({ email });
    if (existing?.status === "APPROVED")
      return res
        .status(409)
        .json({
          success: false,
          message: "An approved member already exists with this email.",
        });
    if (existing?.status === "PENDING")
      return res
        .status(409)
        .json({
          success: false,
          message: "Your membership application is already under review.",
        });
    const data = {
      fullName: req.body.fullName,
      email,
      phone: req.body.phone,
      gender: req.body.gender,
      dateOfBirth: req.body.dateOfBirth,
      occupation: req.body.occupation,
      requestedDesignation: req.body.requestedDesignation,
      address: req.body.address,
      city: req.body.city,
      state: req.body.state,
      district: req.body.district,
      pinCode: req.body.pinCode,
      profilePhoto: await uploadProfilePhoto(req.file),
      role: "MEMBER",
      status: "PENDING",
      passwordHash: null,
      mustChangePassword: false,
      credentialsSent: false,
      credentialsSentAt: null,
    };
    const member =
      existing?.status === "REJECTED"
        ? await User.findByIdAndUpdate(
            existing._id,
            {
              ...data,
              status: "PENDING",
              approvedAt: null,
              approvedBy: null,
              credentialsSent: false,
              credentialsSentAt: null,
            },
            { new: true, runValidators: true },
          )
        : await User.create(data);
    let emailSent = true;
    try {
      await sendRegistrationReceivedEmail({
        email: member.email,
        fullName: member.fullName,
      });
    } catch {
      emailSent = false;
    }
    return res
      .status(201)
      .json({
        success: true,
        emailSent,
        message:
          "Your membership application has been submitted successfully. Your application is currently pending review.",
      });
  } catch (error) {
    next(error);
  }
}

export async function login(req, res, next) {
  try {
    const user = await User.findOne({ email: normalizeEmail(req.body.email) });
    if (!user)
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password." });
    if (user.status === "PENDING")
      return res
        .status(403)
        .json({
          success: false,
          message:
            "Your membership application is still under review. You will receive your login credentials after approval.",
        });
    if (user.status === "REJECTED")
      return res
        .status(403)
        .json({
          success: false,
          message: "Your membership application was not approved.",
        });
    if (user.status === "SUSPENDED")
      return res
        .status(403)
        .json({
          success: false,
          message: "Your account is currently suspended.",
        });
    if (
      !user.passwordHash ||
      !(await bcrypt.compare(
        String(req.body.password || ""),
        user.passwordHash,
      ))
    )
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password." });
    res.cookie("token", generateToken(user), cookieOptions());
    return res.json({ success: true, user: safeUser(user) });
  } catch (error) {
    next(error);
  }
}

export function logout(req, res) {
  res.clearCookie("token", cookieOptions());
  return res.json({ success: true, message: "Logged out successfully." });
}

export async function updateProfile(req, res, next) {
  try {
    const fullName = String(req.body.fullName || "").trim();
    const email = normalizeEmail(req.body.email);

    if (fullName.length < 2)
      return res
        .status(400)
        .json({ success: false, message: "Please provide your full name." });
    if (!/^\S+@\S+\.\S+$/.test(email))
      return res
        .status(400)
        .json({ success: false, message: "Please provide a valid email address." });

    const existing = await User.findOne({ email, _id: { $ne: req.user._id } });
    if (existing)
      return res
        .status(409)
        .json({ success: false, message: "That email address is already in use." });

    req.user.fullName = fullName;
    req.user.email = email;
    if (req.file) {
      const profilePhoto = await uploadProfilePhoto(req.file);
      if (profilePhoto) req.user.profilePhoto = profilePhoto;
    }
    await req.user.save();

    return res.json({ success: true, user: safeUser(req.user) });
  } catch (error) {
    next(error);
  }
}

export function me(req, res) {
  return res.json({ success: true, user: req.user ? safeUser(req.user) : null });
}
