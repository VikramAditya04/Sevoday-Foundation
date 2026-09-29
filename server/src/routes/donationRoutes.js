import { Router } from "express";
import {
  createDonationOrder,
  failDonationPayment,
  listAdminDonations,
  verifyDonationPayment,
} from "../controllers/donationController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = Router();

router.get("/admin", protect, authorize("ADMIN", "SUPER_ADMIN"), listAdminDonations);
router.post("/orders", createDonationOrder);
router.post("/verify", verifyDonationPayment);
router.post("/fail", failDonationPayment);

export default router;
