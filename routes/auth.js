var express = require('express')
var router = express.Router()
const User = require('../models/User')
var jwt = require('jsonwebtoken')
var Config = require('../models/Config')
var bcrypt = require('bcrypt')
var Cookies = require('cookies')

var secretWord = Config.secretWord;
var keys = [Config.cookiesKey];

router.get('/deleted', function(req, res, next){
    res.clearCookie("user_token")
    res.send({message: 'cookie deleted'})
})

router.get('/auth', function(req, res, next){
    var token = req.signedCookies.user_token

    jwt.verify(token, secretWord, function(err, decoded){
        res.json({admin: decoded.admin})
    })
})

router.post('/auth', function(req, res, next){
    if(!req.body.name || !req.body.password)
    {
        res.json({
            error: 'Bad data'
        })
    }
    else{
        User.findOne({
            where: {
                name: req.body.name
            }  
        })
        .then(user => {
            if(!user){
                res.json({
                    success: false,
                    message: 'Nom d\'utilisateur incorrect.'
                });
            }
            else if(user){
                bcrypt.compare(req.body.password, user.password, function(err, result){
                    if(result == true){
                        const payload = {
                            admin: user.admin,
                            id: user.id,
                            xsrfToken: Math.random().toString(36).slice(-15)
                        };
                        var token = jwt.sign(payload, secretWord, {
                            expiresIn : '24h'
                        });

                        res.cookie('user_token', token, { signed: true, httpOnly: true });
        
                        res.json({
                            success: true,
                            message: 'Token provided',
                            xsrfToken: payload.xsrfToken,
                        })
                    }
                    else{
                        res.json({ success: false, message: 'Mot de passe incorrect.'})
                    }
                })
            }
        })
        .catch(err => {
            res.send('error: ' + err)
        })
    }
})

module.exports = router