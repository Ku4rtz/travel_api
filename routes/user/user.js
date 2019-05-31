var express = require('express')
var router = express.Router()
const User = require('../models/User')

router.get('/user/:id', function(req, res, next){
    User.findOne({
        where: {
            id: req.params.id
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

router.delete('/user/:id', function(req, res, next){
    if(req.params.id == decoded.id){
        User.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(() => {
            res.json({ status: 'User Deleted !'})
        })
        .catch(err => {
            res.send('error: ' + err)
        })
    }
    else{
        res.json({ success:'false', message: 'Une erreur est survenue.' })
    }   
})

router.put('/user/:id', function(req, res, next){
    if(!req.body.name){
        res.json({
            error: 'Bad data'
        })
    }
    else if(req.body.id){
        res.json({
            error: 'You can\'t update a unique primary key id'
        })
    }
    else if(req.params.id == decoded.id){
        User.update(req.body, {where : { id: req.params.id }})
            .then(() => {
                res.json({ status: 'User updated !'})
            })
            .catch(err => {
                res.send('error ' + err)
            })
    }
    else{
        res.json({ success:'false', message: 'Une erreur est survenue.' })
    }
})

module.exports = router