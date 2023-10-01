const mongoose = require('mongoose')

const creatureSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required !'],
        minLength: [2, 'Name should be at least 2 characters long !'],
    },
    species: {
        type: String,
        required: [true, 'Species is required !'],
        minLength: [3, 'Species should be at least 3 characters long !'],
    },
    skin: {
        type: String,
        required: [true, 'Skin Color is required !'],
        minLength: [3, 'Skin Color should be at least 3 characters long !'],
    },
    eye: {
        type: String,
        required: [true, 'Eye Color is required !'],
        minLength: [3, 'Eye Color should be at least 3 characters long !'],
    },
    imageUrl: {
        type: String,
        required: [true, 'Image Url is required !'],
        match: /^https?:\/\//i
    },
    description: {
        type: String,
        required: [true, 'Description is required !'],
        minLength: [5, 'Description should be at least 5 characters long !'],
        maxLength: [500, 'Description should not exceed 00 characters !'],
    },
    votes: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
})

const Creature = mongoose.model('Creature', creatureSchema)

module.exports = Creature