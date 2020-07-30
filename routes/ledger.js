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
        console.log(error)
        res.status(500).send(error)
    }
})

module.exports = router