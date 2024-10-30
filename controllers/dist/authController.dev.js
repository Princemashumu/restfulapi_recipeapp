"use strict";

// controllers/authController.js
var User = require('../models/user'); // Make sure the path to your User model is correct


var bcrypt = require('bcryptjs');

var jwt = require('jsonwebtoken');

exports.signup = function _callee(req, res) {
  var _req$body, username, email, password, existingUser, hashedPassword, role, newUser, token;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, username = _req$body.username, email = _req$body.email, password = _req$body.password; // Validate input data

          if (!(!username || !email || !password)) {
            _context.next = 4;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            message: 'All fields are required'
          }));

        case 4:
          _context.next = 6;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }));

        case 6:
          existingUser = _context.sent;

          if (!existingUser) {
            _context.next = 9;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            message: 'User already exists'
          }));

        case 9:
          _context.next = 11;
          return regeneratorRuntime.awrap(bcrypt.hash(password, 10));

        case 11:
          hashedPassword = _context.sent;
          // Set default role as "user"
          role = 'user'; // Create a new user

          newUser = new User({
            username: username,
            email: email,
            password: hashedPassword,
            role: role // Add the role field here

          });
          _context.next = 16;
          return regeneratorRuntime.awrap(newUser.save());

        case 16:
          // Generate a JWT token with role included
          token = jwt.sign({
            userId: newUser._id,
            role: newUser.role
          }, process.env.JWT_SECRET, {
            expiresIn: '1h'
          });
          res.status(201).json({
            message: 'User registered successfully',
            token: token
          });
          _context.next = 24;
          break;

        case 20:
          _context.prev = 20;
          _context.t0 = _context["catch"](0);
          console.error(_context.t0); // Log the actual error to the console

          res.status(500).json({
            message: 'Server error'
          });

        case 24:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 20]]);
};