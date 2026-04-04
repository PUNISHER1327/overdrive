import express from "express";
import { createOrder, verifyPayment } from "../controllers/paymentController.js";
import { cancelBooking } from "../controllers/paymentController.js";

const router = express.Router();

router.post("/create-order", createOrder);
router.post("/verify", verifyPayment);
router.delete("/cancel/:id", cancelBooking);

export default router;