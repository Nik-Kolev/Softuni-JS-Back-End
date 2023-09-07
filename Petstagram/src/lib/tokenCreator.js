const { SECRET } = require('../config/additionalConfigParams');
const jwt = require('./jwtPromisify');

module.exports.tokenCreator = async (payloadData) => {
    const payload = {
        _id: payloadData._id,
        username: payloadData.username,
        email: payloadData.email,
    };

    const token = await jwt.sign(payload, SECRET, { expiresIn: '1d' });

    return token;
};
