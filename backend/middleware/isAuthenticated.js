const isAuthenticated = (req, res, next) => {
  // console.log("isAuthenticated Middleware Check: ", req.session.isAuthenticated);
  if (req.session.isAuthenticated) {
    return next();
  } else {
    return res.status(401).json({ success: false, message: "User not authenticated" });
  }
};

module.exports = isAuthenticated;
