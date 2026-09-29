import { Router } from "express";
import {
  approveMember,
  getMember,
  memberStats,
  pendingMembers,
  rejectMember,
} from "../controllers/memberController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = Router();
const adminOnly = [protect, authorize("ADMIN", "SUPER_ADMIN")];
router.get("/pending", ...adminOnly, pendingMembers);
router.get("/stats", ...adminOnly, memberStats);
router.get("/:id", ...adminOnly, getMember);
router.patch("/:id/approve", ...adminOnly, approveMember);
router.patch("/:id/reject", ...adminOnly, rejectMember);
export default router;
