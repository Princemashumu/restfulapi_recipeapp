"use strict";

var express = require('express');

var mongoose = require('mongoose');

var dotenv = require('dotenv');

var authRoutes = require('./routes/auth');

var recipeRoutes = require('./routes/recipes'); // Import recipe routes


dotenv.config();
var app = express();
app.use(express.json()); // MongoDB connection

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(function () {
  return console.log('MongoDB connected');
})["catch"](function (error) {
  return console.error('MongoDB connection error:', error);
}); // Authentication and Recipe Routes

app.use('/api/auth', authRoutes);
app.use('/api/recipes', recipeRoutes); // Use the recipes route at /api/recipes

module.exports = app;