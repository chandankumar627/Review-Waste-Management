const mongoose = require('mongoose');

const wasteLogSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Organic', 'Plastic', 'Metal', 'Unknown']
  },
  confidence: {
    type: Number,
    required: true,
    min: 0,
    max: 1
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('WasteLog', wasteLogSchema);
