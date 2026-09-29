import { Router } from "express";
import {
  createContent,
  deleteContent,
  getPublicContentBySlug,
  listAdminContent,
  listPublicContent,
  updateContent,
} from "../controllers/contentController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = Router();
const superAdminOnly = [protect, authorize("SUPER_ADMIN")];

router.get("/public/:type", listPublicContent);
router.get("/public/:type/:slug", getPublicContentBySlug);
router.get("/admin/:type", ...superAdminOnly, listAdminContent);
router.post("/", ...superAdminOnly, upload.single("image"), createContent);
router.patch("/:id", ...superAdminOnly, upload.single("image"), updateContent);
router.delete("/:id", ...superAdminOnly, deleteContent);

export default router;
