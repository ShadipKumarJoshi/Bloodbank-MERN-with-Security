const jwt = require("jsonwebtoken");

const authGuard = (req, res, next) => {
  // get header authorizartion

  const authHeader = req.headers.authorization; // authorization is a variable

  if (!authHeader) {
    return res.json({
      success: false,
      message: "Authorzation header not found!",
    });
  }
  // get token by splitting the header
  // Format = "Bearer tokenxysdgjslnksjf"

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.json({
      success: false,
      message: "Token not found !!",
    });
  }

  try {
    // verify token
    const decodeUser = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
    req.user = decodeUser;
    next();
  } catch (error) {
    res.json({
      success: false,
      message: "Invalid Token",
    });
  }
};

const authGuardAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.json({
      success: false,
      message: "Authorzation header not found!",
    });
  }

  const token = authHeader.split(" ")[1];
  // console.log(`The data is:  ${token[1]}`);
  if (!token) {
    return res.json({
      success: false,
      message: "Token not found !!",
    });
  }

  try {
    const decodeUser = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
    req.user = decodeUser;

    if (!req.user.isAdmin) {
      return res.json({
        success: false,
        message: "Permission denied !!",
      });
    }

    next();
  } catch (error) {
    res.json({
      success: false,
      message: "Invalid Token",
    });
  }
};

const authGuardBloodBank = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.json({
      success: false,
      message: "Authorzation header not found!",
    });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.json({
      success: false,
      message: "Token not found !!",
    });
  }

  try {
    const decodeUser = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
    req.user = decodeUser;
    if (!req.user.isBloodBank) {
      return res.json({
        success: false,
        message: "Permission denied !!",
      });
    }
    next();
  } catch (error) {
    res.json({
      success: false,
      message: "Invalid Token",
    });
  }
};

module.exports = { authGuard, authGuardAdmin, authGuardBloodBank };
