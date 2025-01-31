const sanitize = (input) => {
    // Removing script tags and any attempts to inject malicious code
    let sanitized = input.replace(/<script.*?>.*?<\/script>/gi, '');
  
    // Removing special characters
    sanitized = sanitized.replace(/[!@#$%^&*()+=\-[\]';,/{}|":<>?~]/g, '');
  
    return sanitized;
  };
  module.exports = { sanitize };