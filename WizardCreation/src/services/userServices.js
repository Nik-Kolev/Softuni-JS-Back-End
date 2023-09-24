const User = require("../models/User");

exports.createUser = (data) => {
    //TODO: check for user data params inside the controller !
    const { firstName, lastName, email, password } = data
    User.create({ firstName, lastName, email, password })
}
