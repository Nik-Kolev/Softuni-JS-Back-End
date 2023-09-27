const User = require("../models/User");
const jwtHandler = require("../utils/tokenHandler");
const bcrypt = require('bcrypt')

exports.createUser = async (data) => {
    const user = await User.exists({ email: data.email })
    const { firstName, lastName, email, password, rePassword } = data

    if (user) {
        throw new Error('This email is taken!')
    }

    let newUser = await User.create({ firstName, lastName, email, password, rePassword })

    return jwtHandler.tokenSigner(newUser)

}

exports.loginUser = async (data) => {
    const user = await User.findOne({ email: data.email })

    if (!user) {
        throw new Error('Wrong username or password');
    }

    let isValid = await bcrypt.compare(data.password, user.password)

    if (!isValid) {
        throw new Error('Wrong username or password');
    }

    return jwtHandler.tokenSigner(user)
}
