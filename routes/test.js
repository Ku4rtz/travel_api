var express = require('express')
var router = express.Router()
var Cookies = require('cookies')
var Config = require('../models/Config')

router.get('/setuser', function(req, res, next){
    //res.cookie("userData", "petittest");
    res.send('user data added to cookie');
})

router.get('/getuser', function(req, res, next){
    //res.send(req.cookies);
    res.send('hello')
})

module.exports = router