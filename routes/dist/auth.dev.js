"use strict";

// routes/auth.js
var express = require('express');

var bcrypt = require('bcryptjs');

var jwt = require('jsonwebtoken');

var User = require('../models/User');

var router = express.Router(); // Signup route

router.post('/signup', function _callee(req, res) {
  var _req$body, username, email, password, existingUser, hashedPassword, newUser;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, username = _req$body.username, email = _req$body.email, password = _req$body.password;
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }));

        case 4:
          existingUser = _context.sent;

          if (!existingUser) {
            _context.next = 7;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            message: 'User already exists'
          }));

        case 7:
          _context.next = 9;
          return regeneratorRuntime.awrap(bcrypt.hash(password, 10));

        case 9:
          hashedPassword = _context.sent;
          // Create new user
          newUser = new User({
            username: username,
            email: email,
            password: hashedPassword
          });
          _context.next = 13;
          return regeneratorRuntime.awrap(newUser.save());

        case 13:
          res.status(201).json({
            message: 'User registered successfully'
          });
          _context.next = 19;
          break;

        case 16:
          _context.prev = 16;
          _context.t0 = _context["catch"](1);
          res.status(500).json({
            message: 'Server error'
          });

        case 19:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 16]]);
}); // Login route

router.post('/login', function _callee2(req, res) {
  var _req$body2, email, password, user, isPasswordValid, token;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
          _context2.prev = 1;
          _context2.next = 4;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }));

        case 4:
          user = _context2.sent;

          if (user) {
            _context2.next = 7;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            message: 'Invalid credentials'
          }));

        case 7:
          _context2.next = 9;
          return regeneratorRuntime.awrap(bcrypt.compare(password, user.password));

        case 9:
          isPasswordValid = _context2.sent;

          if (isPasswordValid) {
            _context2.next = 12;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            message: 'Invalid credentials'
          }));

        case 12:
          // Generate JWT
          token = jwt.sign({
            userId: user._id
          }, process.env.JWT_SECRET, {
            expiresIn: '1h'
          });
          res.status(200).json({
            token: token
          });
          _context2.next = 19;
          break;

        case 16:
          _context2.prev = 16;
          _context2.t0 = _context2["catch"](1);
          res.status(500).json({
            message: 'Server error'
          });

        case 19:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 16]]);
});
module.exports = router;