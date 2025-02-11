# Recipe App RESTful API

## Overview

This project is a RESTful API for a Recipe App built using Node.js, Express, and MongoDB. It allows users to manage recipes, providing functionality for creating, reading, updating, and deleting recipes with appropriate error handling and data validation.

## Table of Contents

- [Requirements](#requirements)
- [Data Model](#data-model)
- [API Endpoints](#api-endpoints)
- [Authentication](#authentication)
- [Error Handling](#error-handling)
- [Input Validation](#input-validation)
- [Pagination](#pagination)
- [Testing](#testing)
- [Getting Started](#getting-started)

## Requirements

- Node.js
- Express.js
- MongoDB
- Mongoose

## Data Model

The API uses Mongoose to define the schema for the Recipe collection. Below is an example schema:

```javascript
const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  ingredients: { type: [String], required: true },
  instructions: { type: String, required: true },
  cookingTime: { type: Number, required: true }, // in minutes
  servings: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;
```

## API Endpoints

### 📝 POST /recipes
**Create a new recipe.**

```json
{
  "title": "Spaghetti Carbonara",
  "ingredients": ["spaghetti", "eggs", "parmesan cheese", "black pepper", "guanciale"],
  "instructions": "Cook spaghetti. In a bowl, mix eggs and cheese. Combine with pasta.",
  "cookingTime": 20,
  "servings": 2
}
```

### 📌 GET /recipes
**Retrieve all recipes with pagination.**

### 🔍 GET /recipes/:id
**Retrieve a recipe by ID.**

### ❌ DELETE /recipes/:id
**Delete a recipe by ID.**

### ✏️ PUT /recipes/:id
**Update a recipe by ID.**

## Authentication

The app includes user authentication using JWT. Below are the authentication routes:

### 🔑 Signup Route

```javascript
router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});
```

### 🔑 Login Route

```javascript
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});
```

## Error Handling
- Errors are handled gracefully with appropriate HTTP status codes (e.g., 400 for bad requests, 404 for not found).
- Informative error messages are returned to the client.

## Input Validation
- **Required fields:** Validate that necessary fields are present.
- **Data types:** Check that the correct data types are used (e.g., strings, numbers, arrays).
- **Custom validation rules:** Implement custom validation, such as email format and password strength (if applicable).

## Pagination
- Implement pagination to handle large datasets efficiently.
- Users can specify the page number and page size in the query parameters.
- The response includes the total count of items and current page information.

### 📌 Example Request:
```http
GET /recipes?page=1&limit=10
```

### 📌 Example Response:
```json
{
  "totalCount": 50,
  "currentPage": 1,
  "recipes": [ ... ]
}
```

## Testing
✅ Use **Postman** or **Insomnia** to test the API endpoints.
✅ Create requests for each of the above endpoints and verify that the responses meet the expected criteria.

## Getting Started

### 📥 Clone the repository:
```sh
git clone https://github.com/yourusername/recipe-app-api.git
cd recipe-app-api
```

### 📦 Install dependencies:
```sh
npm install
```

### 🛠 Set up your MongoDB database:
- Update the connection string in the `.env` file.

### ▶️ Start the server:
```sh
npm start
```

## 🚀 Use Postman or Insomnia to interact with the API!

