"use strict";

var Recipe = require('../models/recipe'); // Create a new recipe


exports.createRecipe = function _callee(req, res, next) {
  var _req$body, title, ingredients, instructions, category, preparationTime, newRecipe;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, title = _req$body.title, ingredients = _req$body.ingredients, instructions = _req$body.instructions, category = _req$body.category, preparationTime = _req$body.preparationTime; // Create a new recipe instance and set the userId from the authenticated user

          newRecipe = new Recipe({
            title: title,
            ingredients: ingredients,
            instructions: instructions,
            category: category,
            preparationTime: preparationTime,
            userId: req.userId // Use the userId from the decoded token

          });
          _context.next = 5;
          return regeneratorRuntime.awrap(newRecipe.save());

        case 5:
          res.status(201).json(newRecipe);
          _context.next = 11;
          break;

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          next(_context.t0);

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 8]]);
}; // Get all recipes with pagination


exports.getRecipes = function _callee2(req, res, next) {
  var page, pageSize, total, recipes;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          page = parseInt(req.query.page) || 1;
          pageSize = parseInt(req.query.pageSize) || 10;
          _context2.next = 5;
          return regeneratorRuntime.awrap(Recipe.countDocuments());

        case 5:
          total = _context2.sent;
          _context2.next = 8;
          return regeneratorRuntime.awrap(Recipe.find().skip((page - 1) * pageSize).limit(pageSize));

        case 8:
          recipes = _context2.sent;
          res.status(200).json({
            total: total,
            page: page,
            pageSize: pageSize,
            recipes: recipes
          });
          _context2.next = 15;
          break;

        case 12:
          _context2.prev = 12;
          _context2.t0 = _context2["catch"](0);
          next(_context2.t0);

        case 15:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 12]]);
}; // Get a recipe by ID


exports.getRecipeById = function _callee3(req, res, next) {
  var recipe;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(Recipe.findById(req.params.id));

        case 3:
          recipe = _context3.sent;

          if (recipe) {
            _context3.next = 6;
            break;
          }

          return _context3.abrupt("return", res.status(404).json({
            message: 'Recipe not found'
          }));

        case 6:
          res.status(200).json(recipe);
          _context3.next = 12;
          break;

        case 9:
          _context3.prev = 9;
          _context3.t0 = _context3["catch"](0);
          next(_context3.t0);

        case 12:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 9]]);
}; // Update a recipe by ID


exports.updateRecipe = function _callee4(req, res, next) {
  var updatedRecipe;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(Recipe.findByIdAndUpdate(req.params.id, req.body, {
            "new": true,
            runValidators: true
          }));

        case 3:
          updatedRecipe = _context4.sent;

          if (updatedRecipe) {
            _context4.next = 6;
            break;
          }

          return _context4.abrupt("return", res.status(404).json({
            message: 'Recipe not found'
          }));

        case 6:
          res.status(200).json(updatedRecipe);
          _context4.next = 12;
          break;

        case 9:
          _context4.prev = 9;
          _context4.t0 = _context4["catch"](0);
          next(_context4.t0);

        case 12:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 9]]);
}; // Delete a recipe by ID


exports.deleteRecipe = function _callee5(req, res, next) {
  var deletedRecipe;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(Recipe.findByIdAndDelete(req.params.id));

        case 3:
          deletedRecipe = _context5.sent;

          if (deletedRecipe) {
            _context5.next = 6;
            break;
          }

          return _context5.abrupt("return", res.status(404).json({
            message: 'Recipe not found'
          }));

        case 6:
          res.status(200).json({
            message: 'Recipe deleted successfully'
          });
          _context5.next = 12;
          break;

        case 9:
          _context5.prev = 9;
          _context5.t0 = _context5["catch"](0);
          next(_context5.t0);

        case 12:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 9]]);
};