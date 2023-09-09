const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required!'],
        minLength: [2, 'Name should be at least 2 characters long'],
    },
    image: {
        type: String,
        required: [true, 'ImageUrl is required!'],
        match: [/^https?\/\//, 'Invalid url'],
    },
    age: {
        type: Number,
        required: [true, 'Age is required!'],
        min: [1, 'Age cannot be 0 or negative number'],
        max: [100, 'Age cannot be over 100 years'],
    },
    description: {
        type: String,
        required: [true, 'Description is required!'],
        minLength: [5, 'Minimum 5 characters'],
        maxLength: [50, 'Maximum 50 characters'],
    },
    location: {
        type: String,
        required: [true, 'Location is required!'],
        minLength: [5, 'Minimum 5 characters'],
        maxLength: [50, 'Maximum 50 characters'],
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
});

const Photo = mongoose.model('Photo', photoSchema);

module.exports = Photo;
