const Creature = require("../models/Creature")

module.exports.createCreature = async (data) => {
    return Creature.create(data)
}

module.exports.getAllCreatures = async (userId) => {
    return Creature.find().lean()
}

module.exports.getSingleCreature = async (creatureId) => {
    return Creature.findById(creatureId).populate('owner').populate('votes', 'email').lean()
}

module.exports.saveVote = async (creatureId, voteId) => {
    await Creature.findByIdAndUpdate(creatureId, { $push: { votes: voteId } }, { new: true })
}

module.exports.checkVote = async (creatureId, voteId) => {
    return Creature.findOne({ _id: creatureId, votes: { $elemMatch: { $eq: voteId } } })
}

module.exports.deleteCreature = async (creatureId) => {
    await Creature.findByIdAndDelete(creatureId)
}

module.exports.updateCreature = async (creatureId, editedData) => {
    return Creature.findByIdAndUpdate(creatureId, editedData, { new: true, runValidators: true })
}

module.exports.getAllOwnedCreatures = async (userId) => {
    return Creature.find({ owner: userId }).populate('owner').lean()
}