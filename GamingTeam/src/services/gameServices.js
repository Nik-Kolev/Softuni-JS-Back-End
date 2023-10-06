const Game = require("../models/Game");

module.exports.createGame = async (data) => Game.create(data)
