const User = require("../models/User");
const jwt = require("../utils/tokenHandler");

exports.createUser = async (data) => {
    const user = await User.exists({ email: data.email })
    const { firstName, lastName, email, password, rePassword } = data

    if (user) {
        throw new Error('This email is taken!')
    }

    let newUser = await User.create({ firstName, lastName, email, password, rePassword })

    return await jwt.tokenSigner(newUser)

}
