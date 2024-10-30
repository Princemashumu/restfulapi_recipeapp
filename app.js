const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const recipeRoutes = require('./routes/recipes');
const errorHandler = require('./middleware/errorHandler');

dotenv.config();
connectDB();

const app = express();
app.use(express.json()); // Middleware for parsing JSON requests

// Use the recipe routes
app.use('/api/recipes', recipeRoutes);

// Error handling middleware
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
