const express = require('express')
const Ledger = require('../models/ledger')

const router = express.Router()

//user information by id
router.get('/:userId/information', async (req, res) => {
    const _id = req.params.userId
    try {
        const userInfo = await Ledger.find({"userId" : _id})
        res.send(userInfo)
    } catch(error) {
        res.status(500).send(error)
    }
})

//CHECKOUT info
router.get('/CHECKOUT', async (req, res) => {
    try {
        const checkoutInfo = await Ledger.find({"status": "CHECKOUT"})
        res.send(checkoutInfo)
    } catch (error) {
        res.status(500).send(error)
    }
}) 

//RETURN info
router.get('/RETURN', async (req, res) => {
    try {
        const returnInfo = await Ledger.find({"status": "RETURN"})
        res.send(returnInfo)
    } catch (error) {
        res.status(500).send(error)
    }
})
module.exports = router