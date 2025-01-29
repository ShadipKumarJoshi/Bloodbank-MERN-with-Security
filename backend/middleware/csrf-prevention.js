const { randomBytes } = require("crypto");

const generateCSRFToken = (req, res, next) => {
  try {
    const path = req.route.path;
    // console.log("CSRF path: ", path);
    const data = randomBytes(36).toString("base64"); //Generates pseudorandom data. The size argument is a number indicating the number of bytes to generate.
    req.csrf_token = data; // Used as a response and cookie parameter in router.
    // console.log("CSRF req.csrf_token: ", req.csrf_token);
    if (path == "/setCSRFTokenSTP") {
      req.session.csrfToken = data; // Assigns a token parameter to the session.
      // console.log("CSRF req.session.csrfToken: ", req.session.csrfToken);
    }
    next();
  } catch (e) {
    res.status(500).json({ result: false, message: e.message });
    return;
  }
};

const checkCSRFTokenSTP = (req, res, next) => {
  try {
    const sessionUserAuth = req.session.userAuthentication;
    const sessionCsrfToken = req.session.csrfToken;
    const requestCsrfToken = req.get("CSRF-Token");
    // console.log("Session: ", req.session);
    // console.log("Session User Auth: ", sessionUserAuth);
    // console.log("Session CSRF Token: ", sessionCsrfToken);
    // console.log("Request CSRF Token: ", requestCsrfToken);
    if (!sessionUserAuth || !requestCsrfToken || !sessionCsrfToken) {
      return res.json({
        success: false,
        message: "Token has not been provided.",
      });
    }
    if (requestCsrfToken !== sessionCsrfToken) {
      return res.json({
        success: false,
        message: "Invalid token.",
      });
    }
    next();
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
    return;
  }
};

module.exports = {
  generateCSRFToken,
  checkCSRFTokenSTP,
};
