import express from "express";
import { 
  submitReview, 
  getApprovedReviews, 
  getAllReviews, 
  updateReviewStatus, 
  deleteReview 
} from "../controllers/reviewController.js";
import { protectAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.post("/", submitReview);
router.get("/", getApprovedReviews);

// Admin routes (Protected)
router.get("/admin", protectAdmin, getAllReviews);
router.patch("/:id", protectAdmin, updateReviewStatus);
router.delete("/:id", protectAdmin, deleteReview);

export default router;
