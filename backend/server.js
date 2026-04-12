import "dotenv/config.js";
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";

import path from "path";
import bookingRoutes from "./routes/bookingRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import adminAuthRoutes from "./routes/adminAuthRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import competitionRoutes from "./routes/competitionRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";


const app = express();

// middleware
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://overdrive-five.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(express.json());

// Serve static files from the uploads folder
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// connect DB
connectDB();

// routes
app.get("/", (req, res) => {
  res.send("API is running...");
});


app.use("/api/contact", contactRoutes);
app.use("/api/bookings",bookingRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/admin/auth", adminAuthRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/competitions", competitionRoutes);
app.use("/api/analytics", analyticsRoutes);


// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});