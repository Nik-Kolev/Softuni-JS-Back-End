const mongoose = require('mongoose')

const petSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required !'],
        minLength: [2, 'Animal name must be at least 2 characters long !']
    },
    kind: {
        type: String,
        required: [true, 'Kind is required !'],
        minLength: [3, 'Animal kind must be at least 3 characters long !']
    },
    imageUrl: {
        type: String,
        required: [true, 'ImageUrl is required !'],
        validate: {
            validator: function (value) {
                return /^https?:\/\//i.test(value);
            },
            message: 'ImageUrl must be a valid URL starting with http:// or https://',
        },
    },
    years: {
        type: Number,
        required: [true, 'Years are required !'],
        min: [1, 'Animal years must be between 1 and 100 !'],
        max: [100, 'Animal years must be between 1 and 100 !']
    },
    needs: {
        type: String,
        required: [true, 'Animal needs are required !'],
        minLength: [3, 'Needs description should be between 3 and 20 characters !'],
        maxLength: [20, 'Needs description should be between 3 and 20 characters !']
    },
    description: {
        type: String,
        required: [true, 'Description is required !'],
        minLength: [5, 'Animal description should be between 5 and 50 characters !'],
        maxLength: [50, 'Animal description should be between 5 and 50 characters !']
    },
    location: {
        type: String,
        required: [true, 'Location is required !'],
        minLength: [5, 'Animal location should be between 5 and 15 characters !'],
        maxLength: [15, 'Animal location should be between 5 and 15 characters !']
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    donations: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],
    timestamp: {
        type: Date,
        default: Date.now()
    }
})

const Pet = mongoose.model('Pet', petSchema)

module.exports = Pet