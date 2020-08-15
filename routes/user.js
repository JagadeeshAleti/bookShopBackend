const express = require('express')
const User = require('../models/user')
const Ledger = require('../models/ledger')
const user = require('../models/user')
const logger = require('../config/logger')

const router = express.Router()

//Creating a user
router.post('/', async (req, res) => {
    const user = new User(req.body)
    try {
        logger.info('Adding a new user ', { user: req.body })
        await user.save()
        res.status(201).send(user)
    } catch (error) {
        logger.error("Failed to add new user")
        res.status(500).send(error)
    }
})

//Get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find({})
        logger.info("Fetching information of all users")
        res.status(201).send(users)
    } catch (error) {
        logger.error("Failed to fetch all users")
        res.status(500).send(error)
    }
})

//Get a single user by id
router.get('/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const user = await User.findById(_id)
        if (!user) {
            res.status(404).send({error: 'There is no user for this id'})
        }
        logger.info("Fetching user info by id")
        res.send(user)
    } catch (error) {
        logger.error("Failed to fetch user by id")
        res.status(500).send({error: 'Check the id of the user'})
    }
})

//Update a user by id
router.patch('/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'password']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    
    if (!isValidOperation) {
        return res.status(400).send({error: 'Invalid updates!!'})
    }

    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
        if (!user) {
            return res.status(404).send({error: 'There is no user for this id'})
        }
        logger.info("Updation user info by id")
        res.send(user)
    } catch (error) {
        logger.error("Failed to update user by id")
        const err = {
            message: error.message,
        }
        res.status(500).send(err)
    }
    
})

//Delete a user by id 
router.delete('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        if (!user) {
            return res.status(404).send({error: 'There is no user for this id'})
        }
        logger.info("Deleting user by id")
        res.send(user)
    } catch (error) {
        logger.error("Failed to delete user by id")
        res.status(500).send({error: 'Check the id of the user'})
    }
})

module.exports = router