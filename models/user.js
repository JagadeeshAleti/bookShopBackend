const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: password,
        required: true
    }
})

module.exports = mongoose.model('User', userSchema)