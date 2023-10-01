const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
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