var express = require('express')
var router = express.Router()
const Country = require('../models/Country')

router.get('/country', function(req, res, next){
    Country.findAll()
        .then(country => {
            res.json(country)
        })
        .catch(err => {
            res.send('error: ' + err)
        })
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

router.post('/country', function(req, res, next){
    if(!req.body.name_fr){
        res.json({
            error: 'Bad data'
        })
    }
    else{
        Country.create(req.body)
            .then(data => {
                res.send(data)
            })
            .catch(err => {
                res.json('error :' + err)
            })
    }
})

router.delete('/country/:id', function(req, res, next){
    Country.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(() => {
        res.json({ status: 'Country Deleted !'})
    })
    .catch(err => {
        res.send('error: ' + err)
    })
})

router.put('/country/:id', function(req, res, next){
    if(!req.body.name_fr){
        res.json({
            error: 'Bad data'
        })
    }
    else if(req.body.id){
        res.json({
            error: 'You can\'t update a unique primary key id'
        })
    }
    else{
        Country.update(req.body, {where : { id: req.params.id }})
            .then(() => {
                res.json({ status: 'Country updated !'})
            })
            .catch(err => {
                res.send('error ' + err)
            })
    }
})

module.exports = router