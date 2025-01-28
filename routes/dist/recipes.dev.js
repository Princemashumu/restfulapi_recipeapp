"use strict";

// routes/recipes.js
var express = require('express');

var router = express.Router();

var recipeController = require('../controllers/recipeController');

var auth = require('../middleware/auth');

var authorizeRole = require('../middleware/authorizeRole'); // Public routes for guests to GET recipes


router.get('/', recipeController.getRecipes);
router.get('/:id', recipeController.getRecipeById); // Protected routes for authenticated 'user' role

router.post('/', auth, authorizeRole('user'), recipeController.createRecipe);
router.put('/:id', auth, authorizeRole('user'), recipeController.updateRecipe);
router["delete"]('/:id', auth, authorizeRole('user'), recipeController.deleteRecipe);
module.exports = router;