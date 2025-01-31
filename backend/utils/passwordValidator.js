// const zxcvbn = require("zxcvbn");

// const validatePassword = (password) => {
//     const strength = zxcvbn(password);
//     return strength.score >= 3; // Ensure strong passwords
// };

// module.exports = validatePassword;

const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
    return password.length >= minLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;
  };
  
  module.exports = validatePassword;
  