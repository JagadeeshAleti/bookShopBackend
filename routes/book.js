const express = require('express')
const Book = require('../models/book')

const router = express.Router()

//Creating a book
router.post('/', async (req, res) => {
    const book = new Book(req.body)
    try {
        await book.save()
        res.status(201).send(book)
    } catch (error) {
        res.status(500).send(error)
    }
})

//Get all the books
router.get('/', async (req, res) => {
    try {
        const books = await Book.find({})
        res.status(200).send(books)
    } catch (error) {
        res.status(500).send(error)
    }
})

//Get a book by id
router.get('/:id', async (req, res) => {
    const _id = req.params.id
    try {   
        const book = await Book.findById(_id)
        if (!book) {
            res.status(404).send({error: 'There is no boook for this id'})
        }
        res.send(book)
    } catch (error) {
        res.status(500).send({error: 'Check the id of the book'})
    }
})

//Update a book by id
router.patch('/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'author', 'status', 'updatedBy']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    
    if (!isValidOperation) {
        return res.status(400).send({error: 'Invalid updates!!'})
    }

    try {
        const book = await Book.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
        if (!book) {
            return res.status(404).send({error: 'There is no boook for this id'})
        }
        res.send(book)
    } catch (error) {
        res.status(500).send({error: 'Check the id of the book'})
    }
    
})

//Delete a book by id
router.delete('/:id', async (req, res) => {
    try {
        const book =  await Book.findByIdAndDelete(req.params.id)
        if (!book) {
            res.status(404).send({error: 'There is no boook for this id'})
        }
        res.send(book)
    } catch (error) {
        res.status(500).send({error: 'Check the id of the book'})
    }
}) 

//Checkout a book
router.patch('/:bookId/checkout/:userId', async (req, res) => {
    const params = req.params
    const bookdId = params.bookId
    const userId = params.userId
    
    try {
        const book = await Book.findById(bookdId)
        if (!book) {
            res.status(404).send({message: "There is no book for this id"})
            return
        }
        if (book.status !== "AVAILABLE") {
            const err = {
                message: "Book is unavialble"
            }
            res.status(400).send(err) 
            return
        } 
        book.status = "CHECKOUT"
        book.updatedBy = userId
        await book.save()
        res.send(book)
    
    } catch (error) {
        res.status(500).send(error)
    }
    
})

module.exports = router