var express = require('express')
var router = express.Router()
const User = require('../models/User')
var bcrypt = require('bcrypt')
var request = require('request')
let Country = require('../models/Country')
let mongoose = require('mongoose')

const saltRounds = 10;

//Create user
router.post('/user', function(req, res, next){
    if(!req.body.name){
        res.json({
            error: 'Bad data'
        })
    }       
    else if (req.body.captcha === undefined || req.body.captcha === '' || req.body.captcha === null){
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

                const user = new User({
                    name: req.body.name,
                    firstName: req.body.firstName,
                    email: req.body.email,
                    password: req.body.password,
                    birthDate: date,
                    sex: req.body.sex,
                    admin: 0
                })

                user.save(function(err){
                    if(err){
                        if(err.code === 11000){
                            res.status(422).send({
                                success: false,
                                message: 'Cette adresse e-mail existe déjà.'
                            })
                        }
                        else
                        {
                            res.status(400).send({
                                success: false,
                                message: 'Une erreur s\'est produite, veuillez réessayer plus tard.'
                            })
                        }
                    }
                    else
                    {
                        res.json({
                            success: true,
                            message: 'User registered'
                        })
                    }
                })
            })
        }
        else
        {
            res.json({ success: false, message: 'Erreur de captcha. Ce dernier a déjà été utilisé. Rechargez la page.'})
        }
    })
})


router.post('/addCountriesToUser', async function(req, res, next){
    const country = await Country
		.findOne( { alpha3: req.body.code })
		.select('_id')

		User.updateOne(
			{ email: req.body.email },
			{ $push: { countries: mongoose.Types.ObjectId(country._id)}},
		)
		.then(() => res.json("pays ajouté"))
		.catch(err => res.json(err))
})

module.exports = router