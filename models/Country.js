let mongoose = require('mongoose');

const CountrySchema = new mongoose.Schema({
	code: {
		type: Number,
		required: true
	},
	alpha2: {
        type: String,
        required: true,
    },
    alpha3: {
        type: String,
        required: true,
        unique: true
    },
    name_en: {
        type: String,
        required: true,
    },
    name_fr: {
        type: String,
        required: true
    }	
});

let CountryModel = mongoose.model('Country', CountrySchema);

module.exports = CountryModel