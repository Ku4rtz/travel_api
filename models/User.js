let mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	firstName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    birthDate: {
        type: Date,
        required: true
    },
    sex: {
        type: String,
        required: true
    },
    countries: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Country',
            photos: [
                {
                    base64: {
                        type: String,
                        required: true       
                    },
                    title: String,
                    description: String
                }
            ]
        }
    ],
    admin: {
        type: Number,
        required: true
    }
});

let UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;