const { REGEX_EMAIL, REGEX_URL } = require('./regex');

module.exports = {
    validateRegisterInput: (username, email, password, confirmPassword) => {
        const errors = {};
        if (username.trim() === '') {
            errors.username = 'Username must not be empty';
        }
        if (email.trim() === '') {
            errors.email = 'Email must not be empty';
        } else {
            if (!email.match(REGEX_EMAIL)) {
                errors.email = 'Email must be a valid email address';
            }
        }
        if (password === '') {
            errors.password = 'Password must not be empty';
        } else if (password !== confirmPassword) {
            errors.confirmPassword = 'Passwords must match';
        }
        return {
            errors,
            valid: Object.keys(errors).length < 1
        };
    },
    validateLoginInput: (email, password) => {
        const errors = {};
        if (email.trim() === '') {
            errors.email = 'Email must not be empty';
        }
        if (password.trim() === '') {
            errors.password = 'Password must not be empty';
        }
        return {
            errors,
            valid: Object.keys(errors).length < 1
        };
    },
    validateCreateLinkInput: (url, name) => {
        const errors = {};
        if (name.trim() === '') {
            errors.name = 'Name must not be empty';
        }
        if (url.trim() === '') {
            errors.url = 'URL must not be empty';
        } else {
            if (!url.match(REGEX_URL)) {
                errors.url = 'URL must be a valid URL';
            }
        }
        return {
            errors,
            valid: Object.keys(errors).length < 1
        };
    },
    validateEditLinkInput: (_id, url, name, active) => {
        const errors = {};
        if (_id.trim() === '') {
            errors.url = 'ID must not be empty';
        } else {
            if (!_id.match(REGEX_MONGO_ID)) {
                errors.url = 'ID must be a valid mongoDB ID';
            }
        }
        if (url !== undefined) {
            if (url.trim() === '') {
                errors.url = 'URL must not be empty';
            } else {
                if (!url.match(REGEX_URL)) {
                    errors.url = 'URL must be a valid URL';
                }
            }
        }
        if (name !== undefined && name.trim() !== '') {
            errors.name = 'Name must not be empty';
        }
        if (active !== undefined && typeof active === 'boolean') {
            errors.name = 'Active must be either true or false';
        }
        return {
            errors,
            valid: Object.keys(errors).length < 1
        };
    },
    validateDeleteLinkInput: (_id) => {
        const errors = {};
        if (_id.trim() === '') {
            errors.url = 'ID must not be empty';
        } else {
            if (!_id.match(REGEX_MONGO_ID)) {
                errors.url = 'ID must be a valid mongoDB ID';
            }
        }
        return {
            errors,
            valid: Object.keys(errors).length < 1
        };
    }
};
