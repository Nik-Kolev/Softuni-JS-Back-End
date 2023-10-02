const Pet = require("../models/Pet");

module.exports.createPet = async (data) => {
    return Pet.create(data)
}

module.exports.getAllPets = async () => {
    return Pet.find().populate('owner').lean()
}