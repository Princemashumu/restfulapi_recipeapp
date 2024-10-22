// server.js
const app = require('./app'); // Importing app from app.js
const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
