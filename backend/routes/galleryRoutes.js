import express from "express";
import { getGallery, syncGallery } from "../controllers/galleryController.js";
import { protectAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getGallery);
router.route("/sync").post(protectAdmin, syncGallery);

export default router;
