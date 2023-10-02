const Pet = require("../models/Pet");

module.exports.createPet = (data) => {
    return Pet.create(data)
}