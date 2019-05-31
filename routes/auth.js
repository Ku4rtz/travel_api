var express = require('express')
var router = express.Router()
const User = require('../models/User')
var jwt = require('jsonwebtoken')
var config = require('../config')
var bcrypt = require('bcrypt')

var secretWord = config.secretWord;

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
                            id: user.id
                        };
                        var token = jwt.sign(payload, secretWord, {
                            expiresIn : '24h'
                        });
        
                        res.json({
                            success: true,
                            message: 'Enjoy your token',
                            token: token
                        });
                    }
                    else{
                        res.json({ success: false, message: 'Mot de passe incorrect'})
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