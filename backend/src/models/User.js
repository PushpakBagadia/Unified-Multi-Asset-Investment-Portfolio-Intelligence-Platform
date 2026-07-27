const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    firebaseUid: { type: String, required: true, unique: true, index: true },
    email: { type: String, required: true, unique: true },
    displayName: { type: String },
    photoURL: { type: String },
    riskProfile: {
      type: String,
      enum: ['Conservative', 'Moderate', 'Aggressive'],
      default: 'Moderate',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
