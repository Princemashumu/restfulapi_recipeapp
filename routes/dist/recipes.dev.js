"use strict";

var express = require('express');

var router = express.Router();

var recipeController = require('../controllers/recipeController');

var auth = require('../middleware/auth'); // Import the auth middleware
// Define routes for recipe-related operations with authentication


router.post('/', auth, recipeController.createRecipe); // Protected route to create a new recipe

router.get('/', recipeController.getRecipes); // Route to get all recipes with pagination

router.get('/:id', recipeController.getRecipeById); // Route to get a specific recipe by ID

router.put('/:id', auth, recipeController.updateRecipe); // Protected route to update a specific recipe by ID

router["delete"]('/:id', auth, recipeController.deleteRecipe); // Protected route to delete a specific recipe by ID
// Export the router to be used in the main app

module.exports = router;