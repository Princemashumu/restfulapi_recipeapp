// middleware/auth.js
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  
  // Check if the authorization header exists and starts with 'Bearer'
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }

  // Extract the token part from 'Bearer <token>'
  const token = authHeader.split(' ')[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    req.userId = decoded.userId; // Save user ID from token for later use
    next();
  });
};

module.exports = auth;
