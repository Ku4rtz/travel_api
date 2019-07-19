var express = require('express')
var router = express.Router()
const User = require('../../models/User')
const Country = require('../../models/Country')
let mongoose = require('mongoose')

router.get('/users_info', function(req, res, next){
    User.find({}, {name: 1, firstName: 1, _id: 0})
    .then(user =>{
        if(user){
            res.json(user);
        }
        else
        {
            res.json({
                success: false,
                result: false,
                message: "Error " + err
            })
        }
    })
})

router.get('/user/:id', function(req, res, next){
    User.findById(req.params.id).populate('countries')
        .then(user => {
            if(user){
                res.json(user);
            }
            else
            {
                res.json({
                    success: false,
                    result: false,
                    message: "User does not exist"
                })
            }
        })
        .catch(err => {
            res.status(400).send({
                success: false,
                message: "Error: " + err
            })
        })
})

router.get('/thisuser', function(req, res, next){
    if(req.decoded.id){
        User.findById(req.decoded.id).select({password: 0, _id: 0, admin:0}).populate('countries', {_id: 0})
        .then(user => {
            if(user){
                res.json(user);
            }
            else
            {
                res.json({
                    success: false,
                    result: false,
                    message: "User does not exist"
                })
            }
        })
        .catch(err => {
            res.status(400).send({
                success: false,
                message: "Error: " + err
            })
        })
    }
    else
    {
        res.status(400).send({
            success: false,
            message: "Une erreur est survenue"
        })
    }
})

router.delete('/thisuser', function(req, res, next){
    if(req.decoded.id){
        User.findByIdAndDelete(req.decoded.id)
        .then(() => {
            res.json({
                success: true,
                message: "User deleted"
            })
        })
        .catch(err => {
            res.status(400).send({
                success: false,
                message: "Error: " + err
            })
        })
    }
    else
    {
        res.status(400).send({
            success: false,
            message: "Une erreur est survenue"
        })
    }
})


router.put('/thisuser', function(req, res, next){
    if(!req.body.name){
        res.json({
            success: false,
            message: 'Bad data'
        })
    }
    else if(req.body.admin && req.decoded.admin == 0){
        res.json({
            succes: false,
            message: 'Impossible to update field admin'
        })
    }
    else if(req.decoded.id){
        User.findByIdAndUpdate(req.decoded.id, req.body)
            .then(() => {
                res.json({
                    success: true,
                    message: "User updated"
                })
            })
            .catch(err => {
                res.status(400).send({
                    success: false,
                    message: "Error: " + err
                })
            })
    }
    else
    {
        res.status(400).send({
            success: false,
            message: "Une erreur est survenue"
        })
    }
})

router.put('/thisuser_addcountry', function(req, res, next){
    if(!req.body.alpha3){
        res.json({
            success: false,
            message: req.body
        })
    }
    else if(req.decoded.id){
        Country.findOne({ alpha3: req.body.alpha3 }, {_id : 1})
            .then(country => {
                User.updateOne({ _id: req.decoded.id }, { $push: { countries: mongoose.Types.ObjectId(country._id)}})
                    .then(() => {
                        res.json({
                            success: true,
                            message: "User updated"
                        })
                    })
                    .catch(err => {
                        res.status(400).send({
                            success:false,
                            message: "Error " + err
                        })
                    })
                })       
            .catch(err => {
                res.status(400).send({
                    success: false,
                    message: "Error: " + err
                })
            })
    }
    else
    {
        res.status(400).send({
            success: false,
            message: "Une erreur est survenue"
        })
    }
})

module.exports = router