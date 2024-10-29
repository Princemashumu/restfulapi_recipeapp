"use strict";

// middleware/auth.js
var jwt = require('jsonwebtoken');

var auth = function auth(req, res, next) {
  var authHeader = req.headers['authorization']; // Check if the authorization header exists and starts with 'Bearer'

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      message: 'No token provided'
    });
  } // Extract the token part from 'Bearer <token>'


  var token = authHeader.split(' ')[1];
  jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
    if (err) {
      return res.status(403).json({
        message: 'Unauthorized'
      });
    }

    req.userId = decoded.userId; // Save user ID from token for later use

    next();
  });
};

module.exports = auth;