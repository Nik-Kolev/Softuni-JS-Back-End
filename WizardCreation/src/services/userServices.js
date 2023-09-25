const User = require("../models/User");

exports.createUser = async (data) => {
    //TODO: check for user data params inside the controller !
    const { firstName, lastName, email, password, rePassword } = data
    let user = await User.create({ firstName, lastName, email, password, rePassword })
    return user
}
