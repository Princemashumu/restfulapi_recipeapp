const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');
const auth = require('../middleware/auth'); // Import the auth middleware

// Define routes for recipe-related operations with authentication
router.post('/', auth, recipeController.createRecipe); // POST route to create a recipe
router.get('/', recipeController.getRecipes); // GET all recipes with pagination
router.get('/:id', recipeController.getRecipeById); // GET a specific recipe by ID
router.put('/:id', auth, recipeController.updateRecipe); // PUT to update a recipe by ID
router.delete('/:id', auth, recipeController.deleteRecipe); // DELETE a recipe by ID

module.exports = router;
