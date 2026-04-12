import express from 'express';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// ✅ Cloudinary Storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const isVideo = file.mimetype.startsWith("video");

    return {
      folder: "turf_gallery",
      resource_type: isVideo ? "video" : "image",
      allowed_formats: ["jpg", "jpeg", "png", "webp", "mp4", "mov", "avi", "mkv"],
    };
  },
});

// ✅ Multer Upload
const upload = multer({
  storage,
  limits: { fileSize: 100 * 1024 * 1024 }, // 100MB
});

// @desc    Upload Gallery Media
// @route   POST /api/upload
// @access  Private/Admin
router.post('/', protectAdmin, upload.single('media'), (req, res) => {
  if (!req.file) {
    return res.status(400).send({ message: 'No file uploaded' });
  }

  res.send({
    message: 'Media uploaded successfully',
    url: req.file.path, // ✅ Cloudinary URL
    type: req.file.mimetype.startsWith('video') ? 'video' : 'image'
  });
});

export default router;