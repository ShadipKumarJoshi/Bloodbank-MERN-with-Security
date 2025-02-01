
  
const rbac = (roles) => {
  return (req, res, next) => {
    // Check if user object exists in the request
    if (!req.user) {
      console.error("RBAC Error: No user attached to request");
      return res.status(401).json({
        success: false,
        message: "Authentication required: No user data found.",
      });
    }
    // Check if the user's role is included in the allowed roles
    if (!roles.includes(req.user.role)) {
      console.log("user role->>>>>>>>>>>>>", req.user)
      debugger;
      console.error(`RBAC Error: User role ${req.user.role} does not have access`);
      return res.status(403).json({
        success: false,
        message: "Access denied. You do not have the required permission.",
      });
    }

    console.log(`RBAC: Access granted for user role ${req.user.role}`);
    next(); // User has the necessary role, proceed to the next middleware or controller
  };
};

module.exports = rbac;
