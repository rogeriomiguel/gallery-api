const mongoose = require('mongoose');

const { Schema } = mongoose;

const Post = new Schema({
  userId: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  description: String,
  albumId: String,
}, {
  timestamps: true,
});

module.exports = mongoose.model('posts', Post);
