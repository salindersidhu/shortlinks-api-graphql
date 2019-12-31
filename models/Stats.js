const { model, Schema } = require('mongoose');

const statsSchema = new Schema({
    link: {
        ref: 'links',
        type: Schema.Types.ObjectId
    },
    clicks: [{
        date: Date,
        location: {
            latitude: Number,
            longitude: Number
        }
    }]
});

module.exports = model('Stats', statsSchema);
