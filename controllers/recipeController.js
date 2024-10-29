const Recipe = require('../models/recipe');

// Create a new recipe
exports.createRecipe = async (req, res, next) => {
  try {
    const { title, ingredients, instructions, category, preparationTime } = req.body;

    // Create a new recipe instance and set the userId from the authenticated user
    const newRecipe = new Recipe({
      title,
      ingredients,
      instructions,
      category,
      preparationTime,
      userId: req.userId, // Use the userId from the decoded token
    });

    await newRecipe.save();
    res.status(201).json(newRecipe);
  } catch (error) {
    next(error);
  }
};

// Get all recipes with pagination
exports.getRecipes = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;

    const total = await Recipe.countDocuments();
    const recipes = await Recipe.find()
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    res.status(200).json({ total, page, pageSize, recipes });
  } catch (error) {
    next(error);
  }
};

// Get a recipe by ID
exports.getRecipeById = async (req, res, next) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: 'Recipe not found' });
    res.status(200).json(recipe);
  } catch (error) {
    next(error);
  }
};

// Update a recipe by ID
exports.updateRecipe = async (req, res, next) => {
  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedRecipe) return res.status(404).json({ message: 'Recipe not found' });
    res.status(200).json(updatedRecipe);
  } catch (error) {
    next(error);
  }
};

// Delete a recipe by ID
exports.deleteRecipe = async (req, res, next) => {
  try {
    const deletedRecipe = await Recipe.findByIdAndDelete(req.params.id);
    if (!deletedRecipe) return res.status(404).json({ message: 'Recipe not found' });
    res.status(200).json({ message: 'Recipe deleted successfully' });
  } catch (error) {
    next(error);
  }
};
