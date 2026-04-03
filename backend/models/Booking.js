import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    date: {
      type: String, // "2026-04-05"
      required: true,
    },
    startTime: {
      type: String, // "18:00"
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },
    paymentId: {
      type: String,
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);