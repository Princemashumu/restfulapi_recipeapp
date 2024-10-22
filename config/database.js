// config/database.js

// Import mongoose to interact with MongoDB
const mongoose = require('mongoose');

// Define a function to connect to the MongoDB database
const connectDB = async () => {
  try {
    // Attempt to connect to the database using the connection URI from environment variables
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true, // Use the new URL parser
      useUnifiedTopology: true, // Use the new connection management engine
    });
    console.log('MongoDB connected'); // Log success message upon successful connection
  } catch (err) {
    // Log the error if the connection fails
    console.error('Database connection error:', err);
    process.exit(1); // Exit the process with failure code (1)
  }
};

// Export the connectDB function for use in other modules
module.exports = connectDB;
