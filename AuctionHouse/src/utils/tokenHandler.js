const jwt = require('./jwtPromisify')
const { SECRET } = require('../config/additionalConfigInfo')


module.exports.tokenCreator = async (payloadData) => {
    const payload = {
        _id: payloadData._id,
        email: payloadData.email,
    }

    return jwt.sign(payload, SECRET, { expiresIn: '2d' })
}