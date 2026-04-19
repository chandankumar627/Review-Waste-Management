const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const wasteController = require('../controllers/wasteController');
const { protect, admin } = require('../middleware/authMiddleware');

// POST /api/uploadWaste - Upload image and get prediction
router.post('/uploadWaste', protect, upload.single('image'), wasteController.uploadWaste);

// GET /api/stats - Get analytics data
router.get('/stats', protect, wasteController.getStats);

// GET /api/history - Get prediction history
router.get('/history', protect, wasteController.getHistory);

// PUT /api/feedback/:id - Update prediction feedback
router.put('/feedback/:id', protect, wasteController.updateFeedback);

module.exports = router;
