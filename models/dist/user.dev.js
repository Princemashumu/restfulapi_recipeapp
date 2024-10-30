"use strict";

// models/User.js
var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  // Ensure this is unique
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    "enum": ['guest', 'user'],
    "default": 'user'
  } // Only 'guest' or 'user' roles

});
module.exports = mongoose.model('User', userSchema);