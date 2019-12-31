const { model, Schema } = require('mongoose');

const linkSchema = new Schema({
    url: String,
    name: String,
    hash: String,
    active: {
        type: Boolean,
        default: true
    },
    createdBy: {
        ref: 'Users',
        type: Schema.Types.ObjectId
    }
}, { timestamps: true });

module.exports = model('Link', linkSchema);
