const axios = require('axios');
const WasteLog = require('../models/WasteLog');
const fs = require('fs');

// Upload waste image and get AI prediction
exports.uploadWaste = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file uploaded' });
    }

    const imageUrl = `/uploads/${req.file.filename}`;

    // Read image file and convert to base64
    const imageBuffer = fs.readFileSync(req.file.path);
    const base64Image = imageBuffer.toString('base64');

    // Send image to Python AI service
    console.log('Sending request to AI service:', process.env.AI_SERVICE_URL);
    
    const aiResponse = await axios.post(
      process.env.AI_SERVICE_URL,
      {
        image: base64Image
      },
      {
        headers: { 'Content-Type': 'application/json' },
        timeout: 10000
      }
    );

    console.log('AI service response:', aiResponse.data);

    const { category, confidence, disposalSuggestion, wasteFingerprint, environmentalImpact } = aiResponse.data;

    // Save to database
    const wasteLog = new WasteLog({
      user: req.user ? req.user._id : undefined,
      imageUrl,
      category,
      confidence,
      disposalSuggestion,
      wasteFingerprint,
      environmentalImpact
    });

    await wasteLog.save();

    res.status(201).json({
      success: true,
      data: wasteLog
    });

  } catch (error) {
    console.error('Upload error:', error.message);
    if (error.response) {
      console.error('AI service error response:', error.response.data);
    }
    if (error.code === 'ECONNREFUSED') {
      return res.status(500).json({ 
        error: 'AI service is not running. Please start the AI service.',
        details: 'Connection refused to ' + process.env.AI_SERVICE_URL
      });
    }
    res.status(500).json({ 
      error: 'Failed to process waste image',
      details: error.message 
    });
  }
};

// Get analytics stats
exports.getStats = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const query = {};
    if (req.user && req.user.role !== 'admin') {
      query.user = req.user._id;
    }

    // Total predictions today
    const todayCount = await WasteLog.countDocuments({
      ...query,
      createdAt: { $gte: today }
    });

    // Category breakdown
    const matchQuery = req.user && req.user.role !== 'admin' ? { $match: { user: req.user._id } } : { $match: {} };
    
    // Check if any docs with query exist
    let categoryStats = [];
    if (await WasteLog.countDocuments(query) > 0) {
      categoryStats = await WasteLog.aggregate([
        matchQuery,
        {
          $group: {
            _id: '$category',
            count: { $sum: 1 }
          }
        }
      ]);
    }

    // Latest prediction
    const latestPrediction = await WasteLog.findOne(query)
      .sort({ createdAt: -1 });

    // Total all-time predictions
    const totalPredictions = await WasteLog.countDocuments(query);

    res.json({
      success: true,
      data: {
        todayCount,
        totalPredictions,
        categoryStats,
        latestPrediction,
        aiStatus: 'Active'
      }
    });

  } catch (error) {
    console.error('Stats error:', error.message);
    res.status(500).json({ error: 'Failed to fetch statistics' });
  }
};

// Get prediction history
exports.getHistory = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 20;
    const page = parseInt(req.query.page) || 1;
    const skip = (page - 1) * limit;

    const query = {};
    if (req.user && req.user.role !== 'admin') {
      query.user = req.user._id;
    }

    const history = await WasteLog.find(query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip);

    const total = await WasteLog.countDocuments(query);

    res.json({
      success: true,
      data: history,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('History error:', error.message);
    res.status(500).json({ error: 'Failed to fetch history' });
  }
};

// Update Prediction Feedback
exports.updateFeedback = async (req, res) => {
  try {
    const { id } = req.params;
    const { isCorrect, suggestedCategory } = req.body;

    const log = await WasteLog.findById(id);

    if (!log) {
      return res.status(404).json({ error: 'Waste log not found' });
    }

    // Make sure user owns it or is admin
    if (!req.user || (log.user && log.user.toString() !== req.user._id.toString() && req.user.role !== 'admin')) {
      return res.status(401).json({ error: 'Not authorized' });
    }

    log.feedback = { isCorrect, suggestedCategory };
    await log.save();

    res.json({ success: true, data: log });
  } catch (error) {
    console.error('Feedback error:', error.message);
    res.status(500).json({ error: 'Failed to update feedback' });
  }
};
