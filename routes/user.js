var express = require('express')
var router = express.Router()
const User = require('../models/User')
var bcrypt = require('bcrypt')

const saltRounds = 10;

router.post('/user', function(req, res, next){
    if(!req.body.name){
        res.json({
            error: 'Bad data'
        })
    }
    else{ 
        bcrypt.hash(req.body.password, saltRounds, function(err, hash){
            req.body.password = hash;
            User.create(req.body)
            .then(data => {
                res.send(data)
            })
            .catch(err => {
                res.json('error :' + err)
            })
        })
    }
})

module.exports = router