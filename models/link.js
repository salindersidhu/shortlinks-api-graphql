const mongoose = require('mongoose');

/**
 * Define a mongoose schema representing links.
 */
const linkSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    short: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Link', linkSchema);
