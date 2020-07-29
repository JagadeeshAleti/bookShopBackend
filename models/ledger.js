const mongoose = require('mongoose')

const ledgerSchema = new mongoose.Schema({
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        default: null,
        ref: 'Book'
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        default: null,
        ref: 'User'
    },
    status: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAr: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Ledger', ledgerSchema)