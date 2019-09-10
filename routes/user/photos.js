var express = require('express')
var router = express.Router()
const User = require('../../models/User')

router.get('/getPhotos', function(req, res, next){
    User.findOneAndUpdate(
        {
            "name": "CHARLAT",
            "countries": "5d2d847b06f2f94118a36518"
        },
        { $push : { "countries.photos" : {
            base64: "bla"
        } }}
    )
        .then(user => {
            res.json({
                user
            })
        })
        .catch(err => {
            res.status(400).send({
                success: false,
                message: "Error: " + err
            })
        })
})

router.get('/testalacon', function(req, res, next){
    User.findOne(
        {
            "name": "CHARLAT",
            "countries": "5d341a9df565e4330ccbfb37"
        }
    )
    .then(user => {
        res.json({
            user: user.countries
        })
    })
})

module.exports = router