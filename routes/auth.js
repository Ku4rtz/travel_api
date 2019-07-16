var express = require('express')
var router = express.Router()
const User = require('../models/User')
var jwt = require('jsonwebtoken')
var Config = require('../models/Config')
var bcrypt = require('bcrypt')

var secretWord = Config.secretWord;

router.post('/auth', function(req, res, next){
    if(!req.body.login || !req.body.password)
    {
        res.status(400).json({
            success: false,
            message: 'Bad data'
        })
    }
    else{
        User.findOne({ email: req.body.login })
            .then(user => {
                if(!user){
                    res.json({
                        succes: false,
                        message: 'Nom d\'utilisateur incorrect.'
                    });
                }
                else{
                    console.log(user);
                    bcrypt.compare(req.body.password, user.password, function(err, result){
                        if(result){
                            const payload = {
                                admin: user.admin,
                                id: user._id,
                                xsrfToken: Math.random().toString(36).slice(-15)
                            };
                            var token = jwt.sign(payload, secretWord, {
                                expiresIn: '24h'
                            });

                            res.cookie('user_token', token, { signed: true, httpOnly: true });

                            res.json({
                                success: true,
                                message: 'Token provided',
                                xsrfToken: payload.xsrfToken
                            })
                        }
                        else{
                            res.json({
                                success: false,
                                message: 'Mot de passe incorrect.',
                            })
                        }
                    })
                }
            })
            .catch(err => {
                res.status(400).send({
                    success: false,
                    message: 'Une erreur s\'est produite, réessayez plus tard.' + err
                })
            })
    }
})

module.exports = router