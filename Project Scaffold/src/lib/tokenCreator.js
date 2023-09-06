const jwt = require('./jwtPromisify');
const SECRET = '31524021-1035-4acf-ba44-bc81678da21d';

module.exports.tokenCreator = async (payloadData) => {
    const payload = {
        _id: payloadData._id,
        username: payloadData.username,
        email: payloadData.email,
    };

    const token = await jwt.sign(payload, SECRET, { expiresIn: '1d' });

    return token;
};
