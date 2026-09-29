import mongoose from "mongoose";

const donationSchema = new mongoose.Schema(
  {
    donorName: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, required: true, trim: true },
    pinCode: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    state: { type: String, required: true, trim: true },
    amount: { type: Number, required: true, min: 1 },
    currency: { type: String, default: "INR" },
    status: {
      type: String,
      enum: ["PENDING", "PAID", "FAILED"],
      default: "PENDING",
    },
    razorpayOrderId: { type: String, default: null, index: true },
    razorpayPaymentId: { type: String, default: null },
    paidAt: { type: Date, default: null },
  },
  { timestamps: true },
);

export default mongoose.model("Donation", donationSchema);
