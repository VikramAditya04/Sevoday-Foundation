import "dotenv/config";
import bcrypt from "bcryptjs";
import connectDB from "../config/db.js";
import User from "../models/User.js";

const email = String(process.env.SUPER_ADMIN_EMAIL || "")
  .trim()
  .toLowerCase();
if (!email || !process.env.SUPER_ADMIN_PASSWORD)
  throw new Error("SUPER_ADMIN_EMAIL and SUPER_ADMIN_PASSWORD are required.");
await connectDB();
await User.findOneAndUpdate(
  { email },
  {
    fullName: "Sevoday Super Admin",
    email,
    passwordHash: await bcrypt.hash(process.env.SUPER_ADMIN_PASSWORD, 12),
    role: "SUPER_ADMIN",
    status: "APPROVED",
    mustChangePassword: false,
  },
  { upsert: true, new: true, setDefaultsOnInsert: true },
);
console.log("Super admin seeded.");
process.exit(0);
