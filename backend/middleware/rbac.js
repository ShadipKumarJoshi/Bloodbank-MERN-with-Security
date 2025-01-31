const rbac = (roles) => {
    return (req, res, next) => {
      // Ensure the user is authenticated
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: "Not authenticated!",
        });
      }
  
      // Check if the user's role is allowed
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({
          success: false,
          message: "Access denied. You do not have permission.",
        });
      }
  
      next(); // User has permission, proceed to the next middleware or controller
    };
  };
  
  module.exports = rbac;
  