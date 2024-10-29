"use strict";

// server.js
var app = require('./app');

var dotenv = require('dotenv');

dotenv.config();
var PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
  return console.log("Server running on port ".concat(PORT));
});