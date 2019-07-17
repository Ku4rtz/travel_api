var express = require('express')
var router = express.Router()
const Country = require('../../models/Country')

router.get('/country', function(req, res, next){
    Country.find()
        .then(country => {
            res.json(country)
        })
        .catch(err => {
            res.status(400).send({
                success: false,
                message: "Error: " + err
            })
        })
})

router.get('/country/:alpha3', function(req, res, next){
    Country.findOne({ alpha3: req.params.alpha3 })
      .then(country => {
          if(country) {
              res.json(country)
          }
          else {
              res.json({
                  success: false,
                  result: false,
                  message: "Country does not exist"
              })
          }
      })
      .catch(err => {
        res.status(400).send({
            success: false,
            message: "Error: " + err
        })
      })
})


module.exports = router