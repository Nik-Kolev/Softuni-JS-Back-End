const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required!'],
    },
    image: {
        type: String,
        required: [true, 'ImageUrl is required!'],
    },
    age: {
        type: Number,
        required: [true, 'Age is required!'],
    },
    description: {
        type: String,
        required: [true, 'Description is required!'],
    },
    location: {
        type: String,
        required: [true, 'Location is required!'],
    },
    // commentList: {
    //     type: Array,
    //     required: true,
    // },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
});

const Photo = mongoose.model('Photo', photoSchema);

module.exports = Photo;
