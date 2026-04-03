import express from "express";
import { getBookingsByDate } from "../controllers/bookingController.js";
import { createBooking } from "../controllers/bookingController.js";

const router = express.Router();

router.get("/:date", getBookingsByDate);

// test route (keep it for now)
router.get("/test", (req, res) => {
  res.send("Booking route working");
});
router.post("/", createBooking);
export default router;