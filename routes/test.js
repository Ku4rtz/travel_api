var express = require('express')
var router = express.Router()
const User = require('../models/User')

router.post('/test', function(req, res, next){
    User.findOne({ email: req.body.login })
        .then(user => {
            res.json(
                user.password
            )
        })
})

module.exports = router;