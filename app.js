const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const recipeRoutes = require('./routes/recipes'); // Import recipe routes

dotenv.config();

const app = express();
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch((error) => console.error('MongoDB connection error:', error));

// Authentication and Recipe Routes
app.use('/api/auth', authRoutes);
app.use('/api/recipes', recipeRoutes); // Use the recipes route at /api/recipes

module.exports = app;
