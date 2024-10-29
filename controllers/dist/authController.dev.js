"use strict";

// controllers/authController.js
var User = require('./models/user'); // Make sure the User model is correctly imported


var bcrypt = require('bcryptjs');

var jwt = require('jsonwebtoken');

exports.signup = function _callee(req, res) {
  var _req$body, username, email, password, existingUser, hashedPassword, newUser, token;

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
          // Create a new user
          newUser = new User({
            username: username,
            email: email,
            password: hashedPassword
          });
          _context.next = 15;
          return regeneratorRuntime.awrap(newUser.save());

        case 15:
          // Generate a JWT token
          token = jwt.sign({
            userId: newUser._id
          }, process.env.JWT_SECRET, {
            expiresIn: '1h'
          });
          res.status(201).json({
            message: 'User registered successfully',
            token: token
          });
          _context.next = 23;
          break;

        case 19:
          _context.prev = 19;
          _context.t0 = _context["catch"](0);
          console.error(_context.t0); // Log the actual error to the console

          res.status(500).json({
            message: 'Server error'
          });

        case 23:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 19]]);
};