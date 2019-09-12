var express = require('express')
var router = express.Router()
const Photo = require('../../models/Photo')
const Country = require('../../models/Country')
let mongoose = require('mongoose')

router.put('/addPhotos', function(req, res, next){
    if(req.body.alpha3 && req.body.photos){
        Country.findOne({ alpha3: req.body.alpha3 })
        .then(country => {
            console.log(req.body.photos)
            req.body.photos.forEach(function(photo){
                photoToAdd = new Photo({
                    country: mongoose.Types.ObjectId(country._id),
                    user: mongoose.Types.ObjectId(req.decoded.id),
                    base64: photo.base64,
                    title: photo.title,
                    description: photo.description
                });
                photoToAdd.save(function(err, addedPhoto){
                })
            })
            {
                res.json({
                    success: true,
                    message: "Photos added"
                })
            }
        })
    }
    else
    {
        res.json({
            error: req.body.alpha3
        })
    }
})


router.get('/photos_thisUser/:alpha3', function(req, res, next){
        Country.findOne({ alpha3: req.params.alpha3 })
        .then(country => {
            Photo.find({ user: req.decoded.id, country: country._id }, {_id: 0, country: 0})
            .then(photos => {
                res.json(photos)
            })
            .catch(err => {
                res.status(400).send({
                    success: false,
                    message: "Error: " + err
                })
            })
        })
        .catch(err => {
            res.status(400).send({
                success: false,
                message: "Error: " + err
            })
        })
})

module.exports = router