const mongoose = require('mongoose');

const { Schema } = mongoose;

const Album = new Schema({
  userId: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('albums', Album);
