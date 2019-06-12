var express = require('express')
var router = express.Router()
var jwt = require('jsonwebtoken')
var config = require('../../models/Config')

var secretWord = config.secretWord;

router.use(function(req, res, next){
    var token = req.signedCookies.user_token;

    if(token){
        jwt.verify(token, secretWord, function(err, decoded){
            if(err) {
                return res.json({ success: false, message: 'Failed to authenticate token.'});
            }
            req.decoded = decoded;
            if(decoded.admin != 1){
                return res.json({ success: false, message: 'Vous devez être administrateur pour effectuer cette action.'})
            }
            else{
                next();
            }
        })
    }
    else{
        return res.status(403).send({
            success: false,
            message: 'No token provided.',
        });
    }
});

module.exports = router