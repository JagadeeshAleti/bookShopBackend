require('dotenv').config()
const router = require('express').Router()
const logger = require('../config/logger')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

router.post('/logIn', async (req, res) => {
    const data = req.body
    try {
        const user = await User.findOne({name: data.name, password: data.password})
        if (!user) { 
            const failureResponse = {message: "Login Failure"}
            return res.status(401).send(failureResponse)    
        } 

        logger.info("logged in with userId: "+user._id)
        const token = jwt.sign({username: user.name}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1h'})
        const response = {
            token: token
        }
        res.send(response)
    } catch(error) {
        logger.error(error)
        res.status(500).send(error)
    }
})

module.exports = router