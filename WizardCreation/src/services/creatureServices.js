const Creature = require("../models/Ceature")

module.exports.createCreature = async (data) => {
    return Creature.create(data)
}

module.exports.getAllCreatures = async () => {
    return Creature.find().lean()
}

module.exports.getSingleCreature = async (creatureId) => {
    return Creature.findById(creatureId).populate('owner').lean()
}
