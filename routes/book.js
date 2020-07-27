const express = require('express')
const Book = require('../models/book')

const router = express.Router()

router.post('/', async (req, res) => {
    const book = new Book(req.body)
    try {
        await book.save()
        res.status(201).send(book)
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router