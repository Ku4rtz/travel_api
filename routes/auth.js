var express = require('express')
var router = express.Router()
const User = require('../models/User')
var jwt = require('jsonwebtoken')
var config = require('../config')

var secretWord = config.secretWord;

console.log(secretWord);

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
                if(user.password != req.body.password){
                    res.json({ success: false, message: 'Mot de passe incorrect'})
                }
                else{
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
            }
        })
        .catch(err => {
            res.send('error: ' + err)
        })
    }
})

module.exports = router