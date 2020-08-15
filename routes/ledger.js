const express = require('express')
const Ledger = require('../models/ledger')

const router = express.Router()


//Status info
router.get('/filter', async (req, res) => {
    try {    
        const checkoutInfo = await Ledger.find(req.query)
        res.send(checkoutInfo)
    } catch (error) {
        res.status(500).send(error)
    }
}) 

module.exports = router