var express = require('express')
var router = express.Router()
const User = require('../../models/User')

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
        User.findById(req.decoded.id).populate('countries')
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

module.exports = router