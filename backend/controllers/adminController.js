import Booking from "../models/Booking.js";
import Analytics from "../models/Analytics.js";

// @desc Get dashboard stats (revenue, weekly bookings)
// @route GET /api/admin/dashboard
export const getDashboardStats = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());

    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    // Get all bookings
    const allBookings = await Booking.find({});

    let dailyRevenue = 0;
    let weeklyRevenue = 0;
    let monthlyRevenue = 0;
    let weeklyBookingsCount = 0;

    allBookings.forEach((b) => {
        if (b.status === "cancelled" || b.status === "blocked") return;
        
        // Ensure creation date evaluation
        const bDate = new Date(b.createdAt);
        const amount = Number(b.amount) || 0;

        if (bDate >= startOfMonth) {
            monthlyRevenue += amount;
        }
        if (bDate >= startOfWeek) {
            weeklyRevenue += amount;
            weeklyBookingsCount++;
        }
        if (bDate >= today) {
            dailyRevenue += amount;
        }
    });

    // Fetch analytics data
    const analytics = await Analytics.findOne() || { visits: 0, bookNowClicks: 0 };

    res.json({
        revenue: {
            daily: dailyRevenue,
            weekly: weeklyRevenue,
            monthly: monthlyRevenue
        },
        weeklyBookingsCount,
        visits: analytics.visits,
        bookNowClicks: analytics.bookNowClicks
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get all bookings
// @route GET /api/admin/bookings
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({}).sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Block a specific slot
// @route POST /api/admin/block-slot
export const blockSlot = async (req, res) => {
  try {
    const { date, startTime, endTime } = req.body;

    const existingBooking = await Booking.findOne({
      date,
      $or: [
        { startTime: { $lt: endTime }, endTime: { $gt: startTime } },
      ],
    });

    if (existingBooking) {
      return res.status(400).json({ message: "Slot is already booked/blocked" });
    }

    const blockedSlot = await Booking.create({
      name: "ADMIN BLOCK",
      phone: "-",
      date,
      startTime,
      endTime,
      amount: 0,
      status: "blocked",
    });

    res.status(201).json(blockedSlot);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
