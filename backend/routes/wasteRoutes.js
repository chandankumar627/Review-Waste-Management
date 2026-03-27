const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const wasteController = require('../controllers/wasteController');

// POST /api/uploadWaste - Upload image and get prediction
router.post('/uploadWaste', upload.single('image'), wasteController.uploadWaste);

// GET /api/stats - Get analytics data
router.get('/stats', wasteController.getStats);

// GET /api/history - Get prediction history
router.get('/history', wasteController.getHistory);

module.exports = router;
