const njwt = require('njwt');
const bcrypt = require('bcryptjs');

const User = require('../../models/user');

const SALT_FACTOR = 12;

module.exports = {
    users: () => {
        return User.find().then(users => {
            return users.map(user => {
                return { ...user._doc };
            });
        }).catch(err => {
            throw err;
        });
    },
    createUser: async args => {
        try {
            // Check for existing user with the same email 
            const existingUser = await User.findOne({ email: args.userInput.email });
            if (existingUser) {
                throw new Error('User already exists.');
            }
            // Generate hashed password with salt factor
            const hashedPassword = await bcrypt.hash(args.userInput.password, SALT_FACTOR);
            // Create new user document with hashed password
            const user = new User({
                name: args.userInput.name,
                email: args.userInput.email,
                password: hashedPassword
            });
            // Save user document to db
            const result = await user.save();
            return { ...result._doc, password: null, _id: result.id };
        } catch (err) {
            throw err;
        }
    }
};
