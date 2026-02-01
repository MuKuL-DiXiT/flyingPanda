const mongoose = require('mongoose');

const AlertSchema = new mongoose.Schema({
  country: { type: String, required: true, trim: true },
  city: { type: String, required: true, trim: true },
  visaType: { type: String, enum: ['Tourist','Business','Student'], required: true },
  status: { type: String, enum: ['Active','Booked','Expired'], default: 'Active' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Alert', AlertSchema);
