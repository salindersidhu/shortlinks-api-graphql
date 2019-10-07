const bcrypt = require('bcryptjs');
const { UserInputError } = require('apollo-server');

const User = require('../../models/User');
const { TOKEN } = require('../../config');
const { createAuthToken  } = require('../../utils/auth-token');
const {
    validateLoginInput,
    validateRegisterInput
} = require('../../utils/validators');

module.exports = {
    Mutation: {
        async register(
            _,
            {
                registerInput: { username, email, password, confirmPassword }
            },
            context
        ) {
            // Validate user data
            const { valid, errors } = validateRegisterInput(
                username,
                email,
                password,
                confirmPassword
            );
            if (!valid) {
                throw new UserInputError('Errors', { errors });
            }
            // Check for existing user with the same email
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                throw new UserInputError('Email is taken', {
                    errors: {
                        email: 'This email is taken'
                    }
                });
            }
            // Hash password and create auth token
            password = await bcrypt.hash(password, 12);
            // Create new User and save to DB
            const newUser = new User({
                email,
                username,
                password
            });
            const res = await newUser.save();
            // Generate and return auth token
            return {
                token: createAuthToken({
                    sub: res.id,
                    scope: 'default'
                }, TOKEN.KEY, TOKEN.LIFE, context.req)
            };
        },
        async login(_, { loginInput: { email, password } }, context) {
            // Validate user data
            const { valid, errors } = validateLoginInput(
                email,
                password,
            );
            if (!valid) {
                throw new UserInputError('Errors', { errors });
            }
            // Check for existing user with the same email
            const user = await User.findOne({ email: email });
            if (!user) {
                errors.general = 'Incorrect credentials';
                throw new UserInputError('Incorrect credentials', { errors });
            }
            // Check if password matches
            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                errors.general = 'Incorrect credentials';
                throw new UserInputError('Incorrect credentials', { errors });
            }
            // Generate and return auth token
            return {
                token: createAuthToken({
                    sub: user.id,
                    scope: 'default'
                }, TOKEN.KEY, TOKEN.LIFE, context.req)
            };
        }
    }
};
