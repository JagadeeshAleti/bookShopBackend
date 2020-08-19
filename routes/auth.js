require('dotenv').config()
const logger = require('../config/logger')
const jwt = require('jsonwebtoken')
const router = require('express').Router()
const User = require('../models/user')

router.post('/logIn', async (req, res) => {
    const data = req.body
    try {
        const user = await User.findOne({name: data.name, password: data.password})
        if (user) { 
            logger.info("logged in with userId: "+user._id)
            const token = jwt.sign({username: user.name}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1h'})
            const response = {
                token: token
            }
            res.send(response)
            return
        } 
        const failureResponse = {message: "Login Failure"}
        res.status(401).send(failureResponse)
    } catch(error) {
        console.log(error)
        res.status(500).send(error)
    }
})

module.exports = router