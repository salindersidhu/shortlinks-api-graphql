module.exports = {
    validateRegisterInput: (username, email, password, confirmPassword) => {
        const errors = {};
        if (username.trim() === '') {
            errors.username = 'Username must not be empty';
        }
        if (email.trim() === '') {
            errors.email = 'Email must not be empty';
        } else {
            const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
            if (!email.match(regEx)) {
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
    validateLinkInput: (url, name) => {
        const errors = {};
        if (name.trim() === '') {
            errors.name = 'Name must not be empty';
        }
        if (url.trim() === '') {
            errors.url = 'URL must not be empty';
        } else {
            const regEx = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
            if (!url.match(regEx)) {
                errors.url = 'URL must be a valid URL';
            }
        }
        return {
            errors,
            valid: Object.keys(errors).length < 1
        };
    }
};
