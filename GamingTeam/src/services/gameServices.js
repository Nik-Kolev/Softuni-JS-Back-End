const Game = require("../models/Game");

module.exports.createGame = async (data) => Game.create(data)

module.exports.getAllGames = () => Game.find()

module.exports.getGameById = (gameId) => Game.findOne({ _id: gameId })

module.exports.buyTheGame = (gameId, userId) => {
    return Game.findByIdAndUpdate({ _id: gameId }, { $push: { boughtBy: userId } }, { new: true, runValidators: true })
}

module.exports.checkIfBought = (gameId, userId) => {
    return Game.countDocuments({ _id: gameId, boughtBy: userId })
}

module.exports.editGameById = (gameId, data) => {
    return Game.findByIdAndUpdate({ _id: gameId }, data, { new: true, runValidators: true })
}

module.exports.deleteGameById = (gameId) => Game.findByIdAndDelete(gameId)