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

module.exports.donations = async (petId, userId) => {
    return Pet.findByIdAndUpdate(petId, { $push: { donations: userId } }, { new: true })
}

module.exports.checkDonations = async (petId, userId) => {
    return Pet.countDocuments({ _id: petId, donations: userId })
}

module.exports.deletePet = async (petId) => {
    return Pet.findByIdAndDelete(petId)
}