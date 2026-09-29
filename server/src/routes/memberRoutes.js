import { Router } from "express";

import {
  allMembers,
  approveMember,
  getMember,
  memberStats,
  pendingMembers,
  rejectMember,
  publicMembers,
} from "../controllers/memberController.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = Router();

const adminOnly = [protect, authorize("ADMIN", "SUPER_ADMIN")];

// Public endpoint — no login required
router.get("/public", publicMembers);

// Admin-only endpoints
router.get("/all", ...adminOnly, allMembers);

router.get("/pending", ...adminOnly, pendingMembers);

router.get("/stats", ...adminOnly, memberStats);

router.get("/:id", ...adminOnly, getMember);

router.patch("/:id/approve", ...adminOnly, approveMember);

router.patch("/:id/reject", ...adminOnly, rejectMember);

export default router;