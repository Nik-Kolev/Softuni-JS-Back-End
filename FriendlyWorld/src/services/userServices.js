const User = require("../models/User");

module.exports.register = async (userData) => {
    return User.create(userData)
}