import Razorpay from "razorpay";
import crypto from "crypto";
import Booking from "../models/Booking.js";
import { sendSMS } from "../utils/sendSMS.js";


// ✅ Create Order (LOCK SLOT)
export const createOrder = async (req, res) => {
  try {
    const { amount, date, startTime, endTime, name, phone } = req.body;

    console.log("KEY:", process.env.RAZORPAY_KEY_ID);

    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      return res.status(500).json({ message: "Razorpay keys not configured" });
    }

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    // 🔒 Check if slot already locked or booked
    const existingBooking = await Booking.findOne({
      date,
      status: { $in: ["pending", "confirmed"] }, // 🔥 important
      $or: [
        {
          startTime: { $lt: endTime },
          endTime: { $gt: startTime },
        },
      ],
    });

    if (existingBooking) {
      return res.status(400).json({ message: "Slot already booked" });
    }

    // 🔒 Create temporary booking (LOCK SLOT)
    const tempBooking = await Booking.create({
      name,
      phone,
      date,
      startTime,
      endTime,
      amount,
      status: "pending",
    });

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    res.json({
      order,
      bookingId: tempBooking._id, // 🔥 important
    });

  } catch (error) {
    console.error("Create Order Error:", error);
    res.status(500).json({ message: error.message });
  }
};



// ✅ Verify Payment → CONFIRM BOOKING
export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      bookingId, // 🔥 changed
    } = req.body;

    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return res.status(400).json({ message: "Payment verification failed" });
    }

    // 🔥 FIND EXISTING PENDING BOOKING
    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // ✅ UPDATE BOOKING
    booking.status = "confirmed";
    booking.paymentId = razorpay_payment_id;

    await booking.save();
    await sendSMS(
  booking.phone,
  `Your booking is confirmed!
Date: ${booking.date}
Time: ${booking.startTime} - ${booking.endTime}`
);

    res.json({ message: "Payment successful", booking });

  } catch (error) {
    console.error("Verify Payment Error:", error);
    res.status(500).json({ message: error.message });
  }
};



// ❌ Cancel Booking (on failure / close)
export const cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;

    await Booking.findByIdAndDelete(id);

    res.json({ message: "Booking cancelled" });

  } catch (error) {
    console.error("Cancel Booking Error:", error);
    res.status(500).json({ message: error.message });
  }
};