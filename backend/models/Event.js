const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  invitees: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
}, { timestamps: true });

module.exports = mongoose.model('Event', EventSchema);
