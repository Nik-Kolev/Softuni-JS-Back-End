const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const mongooseLeanVirtuals = require('mongoose-lean-virtuals');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required !'],
        minLength: [10, 'Email must be 10 characters or more !'],
        validate: {
            validator: function (value) {
                return /^[A-Za-z]+@[A-Za-z]+\.[A-Za-z]+$/i.test(value);
            },
            message: 'Example of a valid email - "petar@softuni.bg"'
        },
        set: (email) => email.toLowerCase(),
    },
    firstName: {
        type: String,
        required: [true, 'First Name is required !'],
        minLength: [1],
    },
    lastName: {
        type: String,
        required: [true, 'Last Name is required !'],
        minLength: [1],
    },
    password: {
        type: String,
        required: [true, 'Password is required !'],
        minLength: [5, 'Password must be 5 characters or more !']
    },

})

userSchema.virtual('rePass').set(function (value) {
    if (value.length == 0 && this.password.length > 0 && this.email.length > 0) {
        throw new Error('Repeat password is required !')
    }
    if (this.password != value) {
        throw new Error('Password and Repeat Password must match !')
    }
})

userSchema.virtual('fullName').get(function () {
    return this.firstName + ' ' + this.lastName
})

userSchema.pre('save', async function () {
    this.password = await bcrypt.hash(this.password, 10)
})

userSchema.plugin(mongooseLeanVirtuals);

const User = mongoose.model('User', userSchema)

module.exports = User