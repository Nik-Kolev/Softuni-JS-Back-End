const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required !'],
        minLength: [10, 'Email must be 10 characters or more !']
    },
    password: {
        type: String,
        required: [true, 'Password is required !'],
        minLength: [4, 'Password must be 4 characters or more !']
    }
})

userSchema.virtual('rePass').set(function (value) {
    if (value != this.password) {
        throw new Error('Email or password is invalid !')
    }
})

userSchema.pre('save', async function () {
    this.password = await bcrypt.hash(this.password, 10)
})

const User = mongoose.model('User', userSchema)

module.exports = User