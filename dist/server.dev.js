"use strict";

var express = require('express');

var dotenv = require('dotenv');

var connectDB = require('./config/db');

var recipeRoutes = require('./routes/recipes');

var errorHandler = require('./middleware/errorHandler');

dotenv.config();
connectDB();
var app = express();
app.use(express.json()); // Middleware for parsing JSON requests
// Use the recipe routes

app.use('/api/recipes', recipeRoutes); // Error handling middleware

app.use(errorHandler); // Start the server

var PORT = process.env.PORT;
app.listen(PORT, function () {
  console.log("Server running on port ".concat(PORT));
});