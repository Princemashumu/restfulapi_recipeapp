"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

// // middleware/authorizeRole.js
// const authorizeRole = (role) => (req, res, next) => {
//     if (req.userRole == role) {
//       return res.status(403).json({ message: 'Forbidden: Access is denied' });
//     }
//     next();
//   };
//   module.exports = authorizeRole;
var authorizeRole = function authorizeRole() {
  var roles = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  return function (req, res, next) {
    if (roles.length && (!req.user || !roles.includes(req.user.role))) {
      return res.status(403).json({
        error: 'Forbidden: Insufficient permissions'
      });
    }

    next();
  };
};

var _default = authorizeRole;
exports["default"] = _default;