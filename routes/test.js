var express = require('express')
var router = express.Router()
var Cookies = require('cookies')
var Config = require('../Config')

var keys = [Config.cookiesKey]

router.get('/test', function(req, res, next){
    var cookies = new Cookies(req, res, { keys: keys})

    cookies.set('LastVisit', 'Bonjour', { signed: true })
    res.json({
        success: true,
    });
})

router.post('/test', function(req, res, next){
    var cookies = new Cookies(req, res, { keys: keys})
    res.json({
        cookie: cookies.get('access_token', { signed: true })
    })
})

module.exports = router