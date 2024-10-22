// models/recipe.js
const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
  },
  ingredients: {
    type: [String],
    required: [true, 'Please add some ingredients'],
  },
  instructions: {
    type: String,
    required: [true, 'Please add instructions'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Recipe', recipeSchema);
