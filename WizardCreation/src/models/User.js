const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'First name is required !'],
        minLength: [3, 'First name is too short !']
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required !'],
    },
    email: {
        type: String,
        required: [true, 'Email is required !'],
    },
    password: {
        type: String,
        required: [true, 'Password is required !'],
    },

})

const User = mongoose.model('User', userSchema)

module.exports = User