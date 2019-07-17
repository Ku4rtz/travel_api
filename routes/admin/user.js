var express = require('express')
var router = express.Router()
const User = require('../../models/User')

router.get('/user', async function(req, res, next){
    try{
        const users = await User
            .find()
            .populate('countries')

        res.json(users)
    } catch(err){
        res.status(400).send({
            success: false,
            message: 'Error: ' + err
        })
    }
})

router.put('/user/:id', function(req, res, next){
    if(!req.body.name){
        res.json({
            success: false,
            message: 'Bad data'
        })
    }
    else{
        User.findByIdAndUpdate(req.params.id, req.body)
            .then(() => {
                res.json({
                    success: true,
                    message: "User updated"
                })
            })
            .catch(err => {
                res.status(400).send({
                    success: false,
                    message: "Error: " + err
                })
            })
    }
})

router.delete('/user/:id', function(req, res, next){
    User.findByIdAndDelete(req.params.id)
        .then(() => {
            res.json({
                success: true,
                message: "User deleted"
            })
        })
        .catch(err => {
            res.status(400).send({
                success: false,
                message: "Error: " + err
            })
        })
})


module.exports = router