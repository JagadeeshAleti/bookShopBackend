const express = require('express')
const Book = require('../models/book')
const Ledger = require('../models/ledger')

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
        res.send(books)
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
            return res.status(404).send({error: 'There is no boook for this id'})
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
        const bookToUpdate = {
            ...req.body,
            updatedAt: Date.now()
        }
        const book = await Book.findByIdAndUpdate(req.params.id, bookToUpdate, {new: true, runValidators: true})
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
        const bookId = req.params.id
        const book =  await Book.findByIdAndDelete(bookId)
        if (!book) {
            return res.status(404).send({error: 'There is no boook for this id'})
        }
        res.send(book)
    } catch (error) {
        res.status(500).send({error: 'Check the id of the book'})
    }
}) 

//Checkout a book by id
router.patch('/:bookId/checkout/:userId', async (req, res) => {
    const params = req.params
    const bookId = params.bookId
    const userId = params.userId
    
    try {
        const book = await Book.findById(bookId)
        if (!book) {
            return res.status(404).send({message: "There is no book for this id"})
        }
        if (book.status !== "AVAILABLE") {
            const err = {
                message: "Book is unavialble"
            }
            return res.status(400).send(err) 
        } 
        book.status = "UNAVAILABLE"
        book.updatedBy = userId
        await book.save()

        const ledger = new Ledger()
        ledger.status = "CHECKOUT"
        ledger.bookId = bookId
        ledger.userId = userId
        await ledger.save()
        
        const response = {
            book: book,
            ledger: ledger
        }
        res.send(response)
    
    } catch (error) {
        res.status(500).send(error)
    }
    
})

//return a book by id
router.patch('/:bookId/return/:userId', async (req, res) => {
    const params = req.params
    const bookId = params.bookId
    const userId = params.userId
    try {
        const book = await Book.findById(bookId)
        if (!book) {
            return res.status(404).send({message: "There is no book for this id"})
        }
        if (book.status === "AVAILABLE") {
            return res.status(400).send({message: "At present no one has taken the book"})
        }
        book.status = "AVAILABLE"
        book.updatedBy = userId
        await book.save()

        const ledger = new Ledger()
        ledger.status = "RETURN"
        ledger.bookId = bookId
        ledger.userId = userId
        await ledger.save()

        const response = {
            book: book,
            ledger: ledger
        }
        res.send(response)
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router