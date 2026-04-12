import Gallery from "../models/Gallery.js";

// @desc    Get all gallery items
// @route   GET /api/gallery
// @access  Public
export const getGallery = async (req, res) => {
  try {
    const items = await Gallery.find({});
    res.status(200).json({ success: true, data: items });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Replace all gallery items
// @route   POST /api/gallery/sync
// @access  Private/Admin
export const syncGallery = async (req, res) => {
  try {
    const { items } = req.body;
    await Gallery.deleteMany({});
    if (items && items.length > 0) {
      await Gallery.insertMany(items.map(item => ({ type: item.type, url: item.url })));
    }
    const updated = await Gallery.find({});
    res.status(200).json({ success: true, message: "Gallery synchronized", data: updated });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
