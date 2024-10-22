// routes/recipes.js

// Import the express library
const express = require('express');

// Create a router instance from express
const router = express.Router();

// Import the recipe controller containing the business logic for handling recipes
const recipeController = require('../controllers/recipeController');

// Define routes for recipe-related operations
router.post('/', recipeController.createRecipe); // Route to create a new recipe
router.get('/', recipeController.getRecipes); // Route to get all recipes with pagination
router.get('/:id', recipeController.getRecipeById); // Route to get a specific recipe by ID
router.put('/:id', recipeController.updateRecipe); // Route to update a specific recipe by ID
router.delete('/:id', recipeController.deleteRecipe); // Route to delete a specific recipe by ID

// Export the router to be used in the main app
module.exports = router;
