import { Router } from "express";
import rateLimit from "express-rate-limit";
import {
  login,
  logout,
  me,
  register,
  updateProfile,
} from "../controllers/authController.js";
import { optionalProtect, protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = Router();
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many attempts. Please try again later.",
  },
});
router.post("/register", authLimiter, upload.single("profilePhoto"), register);
router.post("/login", authLimiter, login);
router.post("/logout", logout);
router.get("/me", optionalProtect, me);
router.patch("/profile", protect, upload.single("profilePhoto"), updateProfile);
export default router;
