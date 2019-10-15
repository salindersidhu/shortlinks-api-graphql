const { model, Schema } = require('mongoose');

const linkSchema = new Schema({
    name: String,
    longURL: String,
    shortURL: String,
    active: {
        type: Boolean,
        default: true
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
}, { timestamps: true });

module.exports = model('Link', linkSchema);
