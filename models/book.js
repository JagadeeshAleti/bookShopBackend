const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "AVAILABLE",
        required: true
    },
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        default: null,
        ref: 'User'
    }
})

module.exports = mongoose.model('Book', bookSchema)