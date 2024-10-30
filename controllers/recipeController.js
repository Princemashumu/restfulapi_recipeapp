const Recipe = require('../models/Recipe');

// Create a new recipe
exports.createRecipe = async (req, res) => {
    const { title, ingredients, instructions, category, preparationTime } = req.body;

    try {
        const newRecipe = new Recipe({ title, ingredients, instructions, category, preparationTime });
        await newRecipe.save();
        res.status(201).json(newRecipe);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create recipe', error });
    }
};

// Get all recipes with pagination
exports.getRecipes = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;

    try {
        const total = await Recipe.countDocuments();
        const recipes = await Recipe.find()
            .skip((page - 1) * pageSize)
            .limit(pageSize);
        res.status(200).json({ total, page, pageSize, recipes });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch recipes', error });
    }
};

// Get a recipe by ID
exports.getRecipeById = async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        if (!recipe) return res.status(404).json({ message: 'Recipe not found' });
        res.status(200).json(recipe);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch recipe', error });
    }
};

// Update a recipe by ID
exports.updateRecipe = async (req, res) => {
    try {
        const updatedRecipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedRecipe) return res.status(404).json({ message: 'Recipe not found' });
        res.status(200).json(updatedRecipe);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update recipe', error });
    }
};

// Delete a recipe by ID
exports.deleteRecipe = async (req, res) => {
    try {
        const deletedRecipe = await Recipe.findByIdAndDelete(req.params.id);
        if (!deletedRecipe) return res.status(404).json({ message: 'Recipe not found' });
        res.status(200).json({ message: 'Recipe deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete recipe', error });
    }
};
