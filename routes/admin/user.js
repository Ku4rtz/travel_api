var express = require('express')
var router = express.Router()
const User = require('../../models/User')
const Country = require('../../models/Country')

router.get('/user', function(req, res, next){
    User.findAll({
        include: [{
            model: country,
            as: 'Country',
            attributes: ['id', 'name_fr'],
            through: { attributes: [] }
        }]
    })
        .then(user => {
            res.json(user)
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})

module.exports = router