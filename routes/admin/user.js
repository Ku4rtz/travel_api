var express = require('express')
var router = express.Router()
const User = require('../../models/User')

router.get('/user', function(req, res, next){
    User.findAll()
        .then(user => {
            res.json(user)
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})

module.exports = router