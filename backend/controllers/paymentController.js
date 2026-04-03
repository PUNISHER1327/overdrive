import Razorpay from "razorpay";
import crypto from "crypto";
import Booking from "../models/Booking.js";



// ✅ Create Order
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

    const existingBooking = await Booking.findOne({
      date,
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

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    res.json({
      order,
      bookingData: { name, phone, date, startTime, endTime, amount },
    });

  } catch (error) {
    console.error("Create Order Error:", error);
    res.status(500).json({ message: error.message });
  }
};

// ✅ Verify Payment & Save Booking
export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      bookingData,
    } = req.body;

    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return res.status(400).json({ message: "Payment verification failed" });
    }

    // ✅ Save booking after payment
    const booking = await Booking.create({
      ...bookingData,
      paymentId: razorpay_payment_id,
      status: "confirmed",
    });

    res.json({ message: "Payment successful", booking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};