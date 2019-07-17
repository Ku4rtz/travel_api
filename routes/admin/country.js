var express = require('express')
var router = express.Router()
const Country = require('../../models/Country')

router.post('/country', function(req, res, next){
    if(!req.body.name_fr){
        res.status(400).send({
            success: false,
            message: 'Bad data'
        })
    }
    else{
        new Country(req.body).save(function(err){
            if(err){
                res.status(400).send({
                    success: false,
                    message: 'Add country failed: ' + err
                })
            }
            else{
                res.status(201).send({
                    success: true,
                    message: "Country added."
                });
            }
        })
    }
})

router.delete('/country/:alpha3', function(req, res, next){
    Country.deleteOne({ alpha3: req.params.alpha3})
        .then(() => {
            res.json({
                success: true,
                message: 'Country Deleted !'
            });
        })
        .catch(err => {
            res.status(400).send({
                success: false,
                message: 'Error: ' + err
            })
        })
})

router.put('/country/:alpha3', function(req, res, next){
    if(!req.body.name_fr){
        res.json({
            error: 'Bad data'
        })
    }
    else if(req.body.id){
        res.json({
            error: 'You can\'t update a unique primary key id'
        })
    }
    else{
        Country.updateOne({ alpha3: req.params.alpha3 }, {$set: req.body})
            .then(() => {
                res.json({
                    success: true,
                    message: 'Country Updated !'
                });
            })
            .catch(err => {
                res.status(400).send({
                    success: false,
                    message: 'Error: ' + err
                })
            })
    }
})

module.exports = router