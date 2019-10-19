const REGEX_ID = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i;
const REGEX_URL = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
const REGEX_EMAIL = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;

module.exports = {
    validateRegisterInput: (username, email, password, confirmPassword) => {
        const errors = {};
        if (username.trim() === '') {
            errors.username = 'Username must not be empty';
        }
        if (email.trim() === '') {
            errors.email = 'Email must not be empty';
        } else if (!email.match(REGEX_EMAIL)) {
            errors.email = 'Email must be a valid email address';
        }
        if (password === '') {
            errors.password = 'Password must not be empty';
        } else if (password !== confirmPassword) {
            errors.confirmPassword = 'Passwords must match';
        }
        return { errors, valid: Object.keys(errors).length < 1 };
    },
    validateLoginInput: (email, password) => {
        const errors = {};
        if (email.trim() === '') {
            errors.email = 'Email must not be empty';
        }
        if (password.trim() === '') {
            errors.password = 'Password must not be empty';
        }
        return { errors, valid: Object.keys(errors).length < 1 };
    },
    validateCreateLinkInput: (url, name) => {
        const errors = {};
        if (name.trim() === '') {
            errors.name = 'Name must not be empty';
        }
        if (url.trim() === '') {
            errors.url = 'URL must not be empty';
        }
        if (!url.match(REGEX_URL)) {
            errors.url = 'URL must be a valid URL';
        }
        return { errors, valid: Object.keys(errors).length < 1 };
    },
    validateEditLinkInput: (_id, url, name, active) => {
        const errors = {};
        const fields = [url, name, active];
        if (_id.trim() === '') {
            errors.url = 'ID must not be empty';
        } else if (!_id.match(REGEX_ID)) {
            errors.url = 'ID must be a valid MongoDB ID';
        }
        if (url !== undefined) {
            if (url.trim() === '') {
                errors.url = 'URL must not be empty';
            } else if (!url.match(REGEX_URL)) {
                errors.url = 'URL must be a valid URL';
            }
        }
        if (name !== undefined && name.trim() === '') {
            errors.name = 'Name must not be empty';
        }
        // Validate that at least one field of (url, name, active) is provided
        const numUndefined = fields.reduce((accumulator, field) => {
            return accumulator + (field === undefined ? 1 : 0);
        }, 0);
        if (numUndefined === fields.length) {
            errors.general = 'Must provide at least one of url, name or active';
        }
        return { errors, valid: Object.keys(errors).length < 1 };
    },
    validateDeleteLinkInput: (_id) => {
        const errors = {};
        if (_id.trim() === '') {
            errors.url = 'ID must not be empty';
        } else if (!_id.match(REGEX_ID)) {
            errors.url = 'ID must be a valid MongoDB ID';
        }
        return { errors, valid: Object.keys(errors).length < 1 };
    }
};
