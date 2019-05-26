const url = require('url');
const njwt = require('njwt');
const bcrypt = require('bcryptjs');

const config = require('../../config');
const User = require('../../models/user');

module.exports = {
    createUser: async ({ userInput }) => {
        try {
            /* Check for existing user with the same email */
            const existingUser = await User.findOne({ email: userInput.email });
            if (existingUser) {
                throw new Error('User already exists!');
            }
            /* Hash plaintext password for safe storage in DB */
            const hashedPassword = await bcrypt.hash(userInput.password, 12);
            /* Create new User and save to DB */
            const user = new User({
                name: userInput.name,
                email: userInput.email,
                password: hashedPassword
            });
            const result = await user.save();
            /* Return created User with blank password for security */
            return { ...result._doc, password: null };
        } catch(err) {
            throw err;
        }
    },
    login: async ({ loginInput }, req) => {
        /* Check for existing user with the same email */
        const user = await User.findOne({ email: loginInput.email });
        if (!user) {
            throw new Error('Incorrect login credentials!');
        }
        /* Check if password matches */
        const isMatch = await bcrypt.compare(loginInput.password, user.password);
        if (!isMatch) {
            throw new Error('Incorrect login credentials!');
        }
        /* Create a JWT for authentication */
        const token = njwt.create({
            sub: user.id,
            scope: 'default',
            iss: url.format({
                protocol: req.protocol,
                host: req.get('host'),
                pathname: ''
            })
        }, config.SESSION.KEY);
        token.setExpiration(new Date().getTime() + config.SESSION.LIFE);
        /* Return JWT as a compact token */
        return { token: token.compact() };
    }
};
