// routes/recipes.js
const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');
const auth = require('../middleware/auth');
const authorizeRole = require('../middleware/authorizeRole');

// Public routes for guests to GET recipes
router.get('/', recipeController.getRecipes);
router.get('/:id', recipeController.getRecipeById);

// Protected routes for authenticated 'user' role
router.post('/', auth, authorizeRole(['admin','user']), recipeController.createRecipe);
router.put('/:id', auth, authorizeRole(['admin','user']), recipeController.updateRecipe);
router.delete('/:id', auth, authorizeRole(['admin','user']), recipeController.deleteRecipe);

module.exports = router;
