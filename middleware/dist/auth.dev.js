"use strict";

// middleware/auth.js
var jwt = require('jsonwebtoken');

var auth = function auth(req, res, next) {
  var authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      message: 'Access denied: Token required'
    });
  }

  var token = authHeader.split(' ')[1];
  jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
    if (err) return res.status(403).json({
      message: 'Invalid or expired token'
    });
    req.userId = decoded.userId; // Assign user ID and role to request object

    req.userRole = decoded.role;
    next();
  });
};

module.exports = auth;