// Import the Express app from app.js
const app = require('./app');

// Import dotenv to manage environment variables
const dotenv = require('dotenv');

// Load environment variables from a .env file into process.env
dotenv.config();

// Set the port to the value from the environment variable or default to 5000
const PORT = process.env.PORT || 5000;

// Start the server and listen on the specified port
app.listen(PORT, () => 
  console.log(`Server running on port ${PORT}`) // Log a message indicating the server is running
);
