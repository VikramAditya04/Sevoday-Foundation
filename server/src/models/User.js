import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    phone: String,
    gender: String,
    dateOfBirth: Date,
    occupation: String,
    requestedDesignation: String,
    profilePhoto: { type: String, default: null },
    address: String,
    city: String,
    state: String,
    district: String,
    pinCode: String,
    passwordHash: { type: String, default: null },
    role: {
      type: String,
      enum: ["SUPER_ADMIN", "ADMIN", "MEMBER"],
      default: "MEMBER",
    },
    status: {
      type: String,
      enum: ["PENDING", "APPROVED", "REJECTED", "SUSPENDED"],
      default: "PENDING",
    },
    mustChangePassword: { type: Boolean, default: false },
    approvedAt: { type: Date, default: null },
    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    rejectedAt: { type: Date, default: null },
    rejectedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    credentialsSent: { type: Boolean, default: false },
    credentialsSentAt: { type: Date, default: null },
  },
  { timestamps: true },
);

export default mongoose.model("User", userSchema);
