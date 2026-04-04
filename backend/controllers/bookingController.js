import Booking from "../models/Booking.js";

// @desc Get bookings by date
export const getBookingsByDate = async (req, res) => {
  try {
    const { date } = req.params;

    const bookings = await Booking.find({
  date,
  status: { $in: ["pending", "confirmed"] }
});

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Create booking
export const createBooking = async (req, res) => {
  try {
    const { name, phone, date, startTime, endTime, amount } = req.body;

    // 🔒 Check for existing booking
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

    const booking = await Booking.create({
      name,
      phone,
      date,
      startTime,
      endTime,
      amount,
      status: "confirmed",
    });

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};