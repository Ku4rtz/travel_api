var express = require('express')
var router = express.Router()
const Country = require('../../models/Country')

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