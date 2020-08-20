const router = require('express').Router()
const Ledger = require('../models/ledger')
const logger = require('../config/logger')

//Status info
router.get('/filter', async (req, res) => {
    try { 
        logger.info("Filter request made")  
        const checkoutInfo = await Ledger.find(req.query)
        res.send(checkoutInfo)
    } catch (error) {
        logger.error("Filter request failed")
        res.status(500).send(error)
    }
}) 

module.exports = router