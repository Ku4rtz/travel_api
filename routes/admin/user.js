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

module.exports = router