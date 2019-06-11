var express = require('express')
var router = express.Router()
const User = require('../models/User')
var bcrypt = require('bcrypt')
var request = require('request')

const saltRounds = 10;

//Create user
router.post('/user', function(req, res, next){
    if(!req.body.name){
        res.json({
            error: 'Bad data'
        })
    }       
    else{ 
        if (req.body.captcha === undefined || req.body.captcha === '' || req.body.captcha === null){
            return res.json({ success: false, message:'Le captcha n\'a pas été validé.' })
        }

        const secretKey = '6LcyQ6gUAAAAAGTBEcZoKgIDFC_VuATTniZg38rC'

        const verifyUrl = 'https://google.com/recaptcha/api/siteverify?secret=' + secretKey + '&response=' + req.body.captcha;

        request(verifyUrl, (err, response, body) => {
            body = JSON.parse(body);
            if(body.success)
            {
                bcrypt.hash(req.body.password, saltRounds, function(err, hash){
                    req.body.password = hash;
                    var date = new Date(req.body.birthYear + '-' + req.body.birthMonth + '-' + req.body.birthDay);
                    User.create({
                        name: req.body.name,
                        firstName: req.body.firstName,
                        email: req.body.email,
                        password: req.body.password,
                        birthDate: date,
                        sex: req.body.sex,
                        admin: 0
                    })
                    .then(data => {
                        res.send(data)
                    })
                    .catch(err => {
                        res.json('error :' + err)
                    })
                })
            }
            else
            {
                return res.json({ success: false, message: 'Erreur de captcha.'})
            }
        })
    }
})

module.exports = router