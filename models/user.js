const mongoose = require('mongoose');

/**
 * Define a mongoose schema representing users.
 */
const userSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    createdLinks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Link'
    }]
});

module.exports = mongoose.model('User', userSchema);
