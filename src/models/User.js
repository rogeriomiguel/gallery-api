const mongoose = require('mongoose');

const { Schema } = mongoose;

const User = new Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  bio: String,
  profileImage: String,
}, {
  timestamps: true,
});

module.exports = mongoose.model('users', User);
