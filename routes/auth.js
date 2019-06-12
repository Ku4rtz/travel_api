var express = require('express')
var router = express.Router()
const User = require('../models/Config')
var jwt = require('jsonwebtoken')
var Config = require('../models/Config')
var bcrypt = require('bcrypt')
var Cookies = require('cookies')

var secretWord = Config.secretWord;
var keys = [Config.cookiesKey];

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

                        var cookies = new Cookies(req, res, { keys: keys})

                        cookies.set('access_token', token, { signed: true })

                        console.log(cookies.get('access_token', { signed: true }))
        
                        res.json({
                            success: true,
                            message: 'Token provided',
                            xsrfToken: payload.xsrfToken,
                        });
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