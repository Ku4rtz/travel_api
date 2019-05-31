var express = require('express')
var router = express.Router()
const User = require('../models/User')

router.get('/auth', function(req, res, next){
    User.findOne({
        name: req.body.name
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
                    admin: user.admin
                };           
            }
        }
    })
    .catch(err => {
        res.send('error: ' + err)
    })
})

module.exports = router