var express = require('express')
var router = express.Router()
const Country = require('../models/Country')

router.get('/test', function(req, res, next){
    Country.find()
        .then(countries => {
            countries.forEach(function(country){
                Country.update({_id: country._id}, { preposition_fr: 'OK' }, {upsert: true}, function(err){
                })
            })
        })
})

module.exports = router;