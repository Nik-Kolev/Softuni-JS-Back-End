const mongoose = require('mongoose')

const auctionSchema = new mongoose.Schema({
    auctionTitle: {
        type: String,
        required: [true, 'Title is required !'],
        minLength: [4, 'Title must be at least 4 characters long !'],
    },
    description: {
        type: String,
        required: [true, 'Description is required !'],
        maxLength: [200, 'Description must be below 200 characters long !'],
    },
    category: {
        type: String,
        required: [true, 'Category is required !'],
        validate: {
            validator: function (value) {
                return /^(Vehicles|Real Estate|Electronics|Furniture|Other)$/i.test(value);
            },
            message: 'The category should be one of the following: Vehicles, Real Estate, Electronics, Furniture, Other'
        },
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
    },
    author: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    bidder: [{
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }],
})

const Auction = mongoose.model('Auction', auctionSchema)

module.exports = Auction