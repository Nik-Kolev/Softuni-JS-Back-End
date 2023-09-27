const Creature = require("../models/Ceature")

module.exports.createCreature = async (data) => {
    return Creature.create(data)
}
module.exports.getAllCreatures = async (data) => {
    return Creature.find().lean()
}