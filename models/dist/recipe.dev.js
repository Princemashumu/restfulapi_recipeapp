"use strict";

var mongoose = require('mongoose'); // Define the schema for a recipe


var recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  ingredients: {
    type: [String],
    required: true
  },
  instructions: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  preparationTime: {
    type: Number,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  } // Reference to the user

}, {
  timestamps: true
}); // Create and export the Recipe model

var Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;