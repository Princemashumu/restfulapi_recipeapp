// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['guest', 'user'], default: 'user' }, // Only 'guest' or 'user' roles
});

module.exports = mongoose.model('User', userSchema);
