const express = require('express');
const mongoose = require('mongoose');
const recipeRoutes = require('./routes/recipes');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Create an Express application
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Set up Mongoose connection
mongoose.set('strictQuery', true); // Optional: to suppress warnings about strictQuery

// Replace with your actual MongoDB connection string
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/RestFul_Api';

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Database connected successfully');
  })
  .catch((error) => {
    console.error('Database connection error:', error);
  });

// Use routes
app.use('/api/recipes', recipeRoutes);

// Export the app
module.exports = app;
