import { Router } from "express";
import {
  createProject,
  deleteProject,
  listAdminProjects,
  listPublicProjects,
  updateProject,
} from "../controllers/projectController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = Router();
const superAdminOnly = [protect, authorize("SUPER_ADMIN")];

router.get("/public", listPublicProjects);
router.get("/admin", ...superAdminOnly, listAdminProjects);
router.post("/", ...superAdminOnly, upload.single("image"), createProject);
router.patch("/:id", ...superAdminOnly, upload.single("image"), updateProject);
router.delete("/:id", ...superAdminOnly, deleteProject);

export default router;
