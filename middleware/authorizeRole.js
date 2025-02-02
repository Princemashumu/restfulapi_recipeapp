// middleware/authorizeRole.js
const authorizeRole = (role) => (req, res, next) => {
    if (req.userRole == role) {
      return res.status(403).json({ message: 'Forbidden: Access is denied' });
    }
    next();
  };
  
  module.exports = authorizeRole;
  

// const authorizeRole = (roles =[]) => {
//   return (req,res,next) => {
//     if (roles.length && (!req.user || !roles.includes(req.user.role)))
//     {
//       return res.status(403).json({error: 'Forbidden: Insufficient permissions'})
//     }
//     next()
//   }
// }

// module.exports =authorizeRole