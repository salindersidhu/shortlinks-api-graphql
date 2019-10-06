const { model, Schema } = require('mongoose');

const linkSchema = new Schema({
    name: String,
    longURL: String,
    shortURL: String,
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
});

module.exports = model('Link', linkSchema);
