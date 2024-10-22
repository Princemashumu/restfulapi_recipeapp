// controllers/recipeController.js
const Recipe = require('../models/recipe'); // Import the Recipe model

// Create a new recipe
exports.createRecipe = async (req, res, next) => {
  try {
    // Destructure the request body to get the recipe details
    const { title, ingredients, instructions, category, preparationTime } = req.body;

    // Create a new instance of the Recipe model
    const newRecipe = new Recipe({ title, ingredients, instructions, category, preparationTime });

    // Save the new recipe to the database
    await newRecipe.save();

    // Respond with a status of 201 (Created) and the newly created recipe
    res.status(201).json(newRecipe);
  } catch (error) {
    // Pass the error to the next middleware for error handling
    next(error);
  }
};

// Get all recipes with pagination
exports.getRecipes = async (req, res, next) => {
  try {
    // Get the page number and page size from the query parameters, defaulting to 1 and 10 if not provided
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;

    // Count the total number of recipes in the database
    const total = await Recipe.countDocuments();

    // Fetch the recipes with pagination
    const recipes = await Recipe.find()
      .skip((page - 1) * pageSize) // Skip documents based on the current page
      .limit(pageSize); // Limit the number of documents returned

    // Respond with a status of 200 (OK) and the total count, current page, page size, and the recipes
    res.status(200).json({ total, page, pageSize, recipes });
  } catch (error) {
    // Pass the error to the next middleware for error handling
    next(error);
  }
};

// Get a recipe by ID
exports.getRecipeById = async (req, res, next) => {
  try {
    // Find a recipe by its ID from the request parameters
    const recipe = await Recipe.findById(req.params.id);

    // If no recipe is found, respond with a 404 (Not Found) status and an error message
    if (!recipe) return res.status(404).json({ message: 'Recipe not found' });

    // Respond with a status of 200 (OK) and the recipe
    res.status(200).json(recipe);
  } catch (error) {
    // Pass the error to the next middleware for error handling
    next(error);
  }
};

// Update a recipe by ID
exports.updateRecipe = async (req, res, next) => {
  try {
    // Update the recipe by its ID with the data from the request body
    const updatedRecipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Return the updated document
      runValidators: true, // Ensure validators are run for the update
    });

    // If no recipe is found, respond with a 404 (Not Found) status and an error message
    if (!updatedRecipe) return res.status(404).json({ message: 'Recipe not found' });

    // Respond with a status of 200 (OK) and the updated recipe
    res.status(200).json(updatedRecipe);
  } catch (error) {
    // Pass the error to the next middleware for error handling
    next(error);
  }
};

// Delete a recipe by ID
exports.deleteRecipe = async (req, res, next) => {
  try {
    // Delete the recipe by its ID
    const deletedRecipe = await Recipe.findByIdAndDelete(req.params.id);

    // If no recipe is found, respond with a 404 (Not Found) status and an error message
    if (!deletedRecipe) return res.status(404).json({ message: 'Recipe not found' });

    // Respond with a status of 200 (OK) and a success message
    res.status(200).json({ message: 'Recipe deleted successfully' });
  } catch (error) {
    // Pass the error to the next middleware for error handling
    next(error);
  }
};
