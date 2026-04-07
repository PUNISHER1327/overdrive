import express from "express";
import { getDashboardStats, getAllBookings, blockSlot } from "../controllers/adminController.js";
import { protectAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// 🔒 Apply JWT auth middleware to all routes below
router.use(protectAdmin);

router.get("/dashboard", getDashboardStats);
router.get("/bookings", getAllBookings);
router.post("/block-slot", blockSlot);

export default router;
