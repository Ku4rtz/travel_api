var express = require('express')
var router = express.Router()
const Country = require('../../models/Country')

router.get('/country', function(req, res, next){
    Country.findAll()
        .then(country => {
            res.json(country)
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})

router.get('/userCountry', function(req, res, next){
    User
})

router.get('/country/:id', function(req, res, next){
    Country.findOne({
        where: {
            id: req.params.id
        }       
    })
      .then(country => {
          if(country) {
              res.json(country)
          }
          else {
              res.send('Country does not exist')
          }
      })
      .catch(err => {
          res.send('error: ' + err)
      })
})


module.exports = router