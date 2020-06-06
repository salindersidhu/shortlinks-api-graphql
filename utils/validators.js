const zxcvbn = require("zxcvbn");

const REGEX_ID = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i;
const REGEX_URL = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
const REGEX_EMAIL = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;

module.exports = {
  validateRegisterInput: (username, email, password, confirmPassword) => {
    const errors = {};
    if (username.trim() === "") {
      errors.username = "Username must not be empty";
    }
    if (!email.match(REGEX_EMAIL)) {
      errors.email = "Email must be a valid email address";
    }
    if (password === "") {
      errors.password = "Password must not be empty";
    } else if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords must match";
    } else if (zxcvbn(password).score < 3) {
      errors.password = "Please choose a stronger password";
    }
    return { errors, valid: Object.keys(errors).length < 1 };
  },
  validateLoginInput: (email, password) => {
    const errors = {};
    if (email.trim() === "") {
      errors.email = "Email must not be empty";
    }
    if (password.trim() === "") {
      errors.password = "Password must not be empty";
    }
    return { errors, valid: Object.keys(errors).length < 1 };
  },
  validateCreateLinkInput: (url, name) => {
    const errors = {};
    if (name.trim() === "") {
      errors.name = "Name must not be empty";
    }
    if (url.trim() === "") {
      errors.url = "URL must not be empty";
    }
    if (!url.match(REGEX_URL)) {
      errors.url = "URL must be a valid URL";
    }
    return { errors, valid: Object.keys(errors).length < 1 };
  },
  validateEditLinkInput: (_id, name) => {
    const errors = {};
    if (!_id.match(REGEX_ID)) {
      errors.url = "ID must be a valid MongoDB ID";
    }
    if (name.trim() === "") {
      errors.name = "Name must not be empty";
    }
    return { errors, valid: Object.keys(errors).length < 1 };
  },
  validateDeleteLinkInput: (_id) => {
    const errors = {};
    if (!_id.match(REGEX_ID)) {
      errors.url = "ID must be a valid MongoDB ID";
    }
    return { errors, valid: Object.keys(errors).length < 1 };
  },
};
