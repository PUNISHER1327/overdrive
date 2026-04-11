import express from 'express';
import multer from 'multer';
import path from 'path';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Configuration for Multer storage
const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/gallery/');
    },
    filename(req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    }
});

// File filter to allow images and videos
const checkFileType = (file, cb) => {
    const filetypes = /jpg|jpeg|png|webp|mp4|mov|avi|mkv/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb('Error: Images and Videos only!');
    }
};

const upload = multer({
    storage,
    limits: { fileSize: 100 * 1024 * 1024 }, // 100MB limit
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
});

// @desc    Upload Gallery Media
// @route   POST /api/upload
// @access  Private/Admin
router.post('/', protectAdmin, upload.single('media'), (req, res) => {
    if (!req.file) {
        return res.status(400).send({ message: 'No file uploaded' });
    }
    
    const filePath = `/${req.file.path.replace(/\\/g, '/')}`; // Ensure web-friendly path
    res.send({
        message: 'Media uploaded successfully',
        url: filePath,
        type: req.file.mimetype.startsWith('video') ? 'video' : 'image'
    });
});

export default router;
