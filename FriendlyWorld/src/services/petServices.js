const Pet = require("../models/Pet");

module.exports.createPet = async (data) => {
    return Pet.create(data)
}

module.exports.getAllPets = async () => {
    return Pet.find().lean()
}

module.exports.getSpecificPet = async (petId) => {
    return Pet.findOne({ _id: petId }).populate('owner').lean()
}
