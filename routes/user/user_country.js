var express = require('express')
var router = express.Router()
const Country = require('../../models/Country')
const User = require('../../models/User')

router.get('/thisuserCountries', function(req, res, next){
    User.findOne({
        include: [{
            model: Country,
            as: 'countries',
            required: false,
            attributes: ['id'],
            through: { attributes: [] }
        }],
        where: {
            id: req.decoded.id
        }       
    })
      .then(user => {
          if(user) {
              res.json(user)
          }
          else {
              res.send('User does not exist')
          }
      })
      .catch(err => {
          res.send('error: ' + err)
      })
})


module.exports = router