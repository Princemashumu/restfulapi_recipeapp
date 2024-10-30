"use strict";

// middleware/authorizeRole.js
var authorizeRole = function authorizeRole(role) {
  return function (req, res, next) {
    if (req.userRole !== role) {
      return res.status(403).json({
        message: 'Forbidden: Access is denied'
      });
    }

    next();
  };
};

module.exports = authorizeRole;