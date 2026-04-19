const mongoose = require('mongoose');

const wasteLogSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false // Optional to allow anonymous uploads or legacy data
  },
  imageUrl: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
  },
  confidence: {
    type: Number,
    required: true,
    min: 0,
    max: 1
  },
  disposalSuggestion: {
    action: String, // Recycle, Compost, Hazardous, Trash
    explanation: String
  },
  wasteFingerprint: {
    condition: String, // Dry, Wet
    recyclable: Boolean,
    decompositionTime: String // e.g. "2 to 6 weeks", "400 years"
  },
  environmentalImpact: {
    savedLandfillKg: Number,
    co2ReducedKg: Number,
    interlockingTiles: Number
  },
  feedback: {
    isCorrect: Boolean,
    suggestedCategory: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('WasteLog', wasteLogSchema);
