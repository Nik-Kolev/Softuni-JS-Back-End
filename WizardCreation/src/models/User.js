const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'First name is required !'],
        minLength: [3, 'First Name should be at least 3 characters long !'],
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required !'],
        minLength: [3, 'Last Name should be at least 3 characters long !'],
    },
    email: {
        type: String,
        required: [true, 'Email is required !'],
        minLength: [10, 'Email should be at least 10 characters long !'],
    },
    password: {
        type: String,
        required: [true, 'Password is required !'],
        minLength: [4, 'Password can not be shorter than 4 characters !'],
    },

})


userSchema.virtual('rePassword').set(function (value) {
    if (value !== this.password) {
        throw new Error('Password does not match !');
    }
});

userSchema.pre('save', async function () {
    this.password = await bcrypt.hash(this.password, 10)
})

const User = mongoose.model('User', userSchema)

module.exports = User