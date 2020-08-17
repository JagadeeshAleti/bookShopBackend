const logger = require('../config/logger')

const router = require('express').Router()
const User = require('../models/user')

router.post('/logIn', async (req, res) => {
    const data = req.body
    try {
        const user = await User.find({name: data.name, password: data.password})
        if (user[0]) { 
            const successResponse = {message: "Login Success"}
            res.send(successResponse)
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