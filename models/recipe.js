// Import the mongoose library
const mongoose = require('mongoose');

// Define the recipe schema using Mongoose
const recipeSchema = new mongoose.Schema({
  // Title of the recipe
  title: {
    type: String, // The type of the field is String
    required: [true, 'Please add a title'], // The title is required; if not provided, it returns this error message
  },
  // List of ingredients for the recipe
  ingredients: {
    type: [String], // The type is an array of Strings
    required: [true, 'Please add some ingredients'], // Ingredients are required; returns this error message if not provided
  },
  // Instructions for preparing the recipe
  instructions: {
    type: String, // The type of the field is String
    required: [true, 'Please add instructions'], // Instructions are required; returns this error message if not provided
  },
  // Timestamp for when the recipe was created
  createdAt: {
    type: Date, // The type is Date
    default: Date.now, // Default value is the current date and time
  },
});

// Export the Recipe model based on the recipe schema
module.exports = mongoose.model('Recipe', recipeSchema);
