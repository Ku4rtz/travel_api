var express = require('express')
var router = express.Router()
var jwt = require('jsonwebtoken')
var config = require('../../models/Config')

var secretWord = config.secretWord;

router.use(function(req, res, next){
    var token = req.signedCookies.user_token;
    var xsrfToken = req.headers.authorization;

    if(token){
        jwt.verify(token, secretWord, function(err, decoded){
            if(decoded.xsrfToken != xsrfToken){
                console.log("!!!!! ATTAQUE TOKEN XSRF !!!!!")
                return res.json({ success: false, message: 'Attaque token XSRF'})
            }
            else if(err){
                return res.json({ success: false, message: 'Failed to authenticate token'});
            }
            req.decoded = decoded;
            next();         
        })
    }
    else{
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
    }
});

module.exports = router