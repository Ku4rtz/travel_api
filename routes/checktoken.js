var express = require('express')
var router = express.Router()
var jwt = require('jsonwebtoken')
var config = require('../models/Config')

var secretWord = config.secretWord;

router.post('/checktoken', function(req, res, next){
    var token = req.signedCookies.user_token;
    var xsrfToken = req.headers.authorization;

    if(token){
        jwt.verify(token, secretWord, function(err, decoded){
            if(decoded.xsrfToken != xsrfToken){
                res.json({ success: false, message: 'Failed to authenticate token XSRF'})
            }
            else if(err){
                res.json({ success: false, message: 'Failed to authenticate token'});
            }
            else{
                res.json({ success: true })
            }       
        })
    }
    else{
        res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
    }
});

module.exports = router