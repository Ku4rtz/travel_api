let mongoose = require('mongoose');

const PhotoSchema = new mongoose.Schema({
	country: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Country'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    base64: {
        type: String,
        required: true
    },
    title: {
        type: String
    },
    description: {
        type: String
    }
});

let PhotoModel = mongoose.model('Photo', PhotoSchema);

module.exports = PhotoModel