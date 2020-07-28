const mongoose = require('mongoose')
const passwordValidator = require('password-validator')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password does not contain "password"')
            } 
            
            var schema = new passwordValidator();

            schema     
            .has().min(7)                            
            .has().uppercase()                              
            .has().lowercase()                              
            .has().digits()                                
            .has().not().spaces()  
            
            if (!schema.validate(value)) {
                throw new Error('Password must have 7 characters with lower,upper,digits except spaces')
            }
        }
    }
})

module.exports = mongoose.model('User', userSchema)