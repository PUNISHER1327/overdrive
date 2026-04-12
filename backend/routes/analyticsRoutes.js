import express from 'express';
import Analytics from '../models/Analytics.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Helper to get or create analytics document
const getAnalytics = async () => {
    let analytics = await Analytics.findOne();
    if (!analytics) {
        analytics = await Analytics.create({ visits: 0, bookNowClicks: 0 });
    }
    return analytics;
};

// @desc    Increment website visits
// @route   POST /api/analytics/visit
// @access  Public
router.post('/visit', async (req, res) => {
    try {
        const analytics = await getAnalytics();
        analytics.visits += 1;
        await analytics.save();
        res.json({ success: true, visits: analytics.visits });
    } catch (error) {
        res.status(500).json({ message: 'Server error tracking visit' });
    }
});

// @desc    Increment book now clicks
// @route   POST /api/analytics/click
// @access  Public
router.post('/click', async (req, res) => {
    try {
        const analytics = await getAnalytics();
        analytics.bookNowClicks += 1;
        await analytics.save();
        res.json({ success: true, bookNowClicks: analytics.bookNowClicks });
    } catch (error) {
        res.status(500).json({ message: 'Server error tracking click' });
    }
});

// @desc    Get analytics stats
// @route   GET /api/analytics/stats
// @access  Private/Admin
router.get('/stats', protectAdmin, async (req, res) => {
    try {
        const analytics = await getAnalytics();
        res.json(analytics);
    } catch (error) {
        res.status(500).json({ message: 'Server error fetching stats' });
    }
});

export default router;
