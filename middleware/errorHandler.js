// middleware/errorHandler.js

// Export the error handling middleware function
module.exports = (err, req, res, next) => {
  // Log the error stack trace to the console for debugging
  console.error(err.stack);

  // Respond with a 500 (Internal Server Error) status and a JSON object containing the error message
  res.status(500).json({ 
    message: 'An internal server error occurred', // Generic error message for the client
    error: err.message // Detailed error message for debugging (optional to expose in production)
  });
};
