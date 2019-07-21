var express = require('express')
var router = express.Router()
const User = require('../../models/User')
const Country = require('../../models/Country')
let mongoose = require('mongoose')

router.post('/disconnect', function(req, res, next){
    res.clearCookie('user_token');
    res.json({
        success: true,
        message: "Disconnected"
    })
})

module.exports = router;