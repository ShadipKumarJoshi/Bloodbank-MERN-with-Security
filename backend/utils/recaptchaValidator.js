const axios = require("axios");

// Function to verify reCAPTCHA response
const recaptchaVerify = async (captchaResponse) => {
  try {
    const response = await axios.post(`https://www.google.com/recaptcha/api/siteverify`, null, {
      params: {
        secret: process.env.RECAPTCHA_SECRET_KEY, // Secret key from .env
        response: captchaResponse, // User's captcha response from frontend
      },
    });

    // Return true if the verification succeeds
    return response.data.success;
  } catch (error) {
    console.error("ReCAPTCHA verification failed:", error);
    return false; // Return false in case of any error
  }
};

module.exports = recaptchaVerify;
