var express = require('express')
var router = express.Router()
const User = require('../models/User')

router.post('/user', function(req, res, next){
    if(!req.body.name){
        res.json({
            error: 'Bad data'
        })
    }
    else{
        User.create(req.body)
            .then(data => {
                res.send(data)
            })
            .catch(err => {
                res.json('error :' + err)
            })
    }
})

module.exports = router