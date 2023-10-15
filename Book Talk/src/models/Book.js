const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    bookTitle: {
        type: String,
        required: [true, 'Title is required !'],
        minLength: [2, 'Title must be at least 2 characters long !'],
    },
    author: {
        type: String,
        required: [true, 'Author is required !'],
        minLength: [5, 'Author must be at least 5 characters long !'],
    },
    genre: {
        type: String,
        required: [true, 'Genre is required !'],
        minLength: [3, 'Genre should be at least 3 characters  !'],
    },
    stars: {
        type: Number,
        required: [true, 'Stars is required !'],
        min: [1, 'Stars must be between 1 and 5 !'],
        max: [5, 'Stars must be between 1 and 5 !'],
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
    review: {
        type: String,
        required: [true, 'Review is required !'],
        minLength: [10, 'Review should be at least 10 characters !'],
    },
    wishingList: [{
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
})

const Book = mongoose.model('Book', bookSchema)

module.exports = Book