const { SECRET } = require('../configurations/configParams')
const jwt = require('./jwtPromisify')

module.exports.tokenSigner = (payloadData) => {
    const payload = {
        _id: payloadData._id,
        username: payloadData.username,
        email: payloadData.email
    }

    return jwt.sign(payload, SECRET, { expiresIn: '2d' })
}