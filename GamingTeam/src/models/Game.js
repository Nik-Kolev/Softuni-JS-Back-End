const mongoose = require('mongoose')

const gameSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required !'],
        minLength: [4, 'Game name must be at least 4 characters long !']
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
    price: {
        type: Number,
        required: [true, 'Price is required !'],
        min: [1, 'Price must be greater than 0 !'],
    },
    description: {
        type: String,
        required: [true, 'Description is required !'],
        minLength: [10, 'Game description should be at least 10 characters !'],

    },
    genre: {
        type: String,
        required: [true, 'Game genre is required !'],
        minLength: [2, 'Game genre should be at least 2 characters  !'],
    },
    platform: {
        type: String,
        required: [true, 'Platform is required !'],
        validate: {
            validator: function (value) {
                return /^(PC|PS4|PS5|XBOX|Nintendo)$/i.test(value);
            },
            message: 'Platform must be PC, Nintendo, PS4, PS5 or XBOX'
        },
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    boughtBy: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],
})

const Game = mongoose.model('Game', gameSchema)

module.exports = Game