const router = require('express').Router()
const Ledger = require('../models/ledger')
const logger = require('../config/logger')

//Status info
router.get('/filter', async (req, res) => {
    const query = req.query
    const status = query.status
    const page = parseInt(query.page || '1')
    const limit = parseInt(query.limit || '3')

    const searchKeys = ['status', 'userId', 'bookId']
    const queryObj = {}

    searchKeys.forEach(x => {
        if(query[x]) {
            queryObj[x] = query[x]
        }
    })

    console.log(queryObj)
    try { 
        logger.info("Filter request made")  
        const checkoutInfo = await Ledger.find(queryObj).limit(limit).skip((page-1)*limit)
        res.send(checkoutInfo)
    } catch (error) {
        logger.error("Filter request failed")
        res.status(500).send(error)
    }
}) 

module.exports = router