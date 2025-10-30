const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  breed: String,
  age: Number,
  health: String,
  adopted: { type: Boolean, default: false },
  adopter: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  addedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('Pet', petSchema);
