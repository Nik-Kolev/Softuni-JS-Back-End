const User = require('../config/models/User');
const bcrypt = require('bcrypt');
const jwt = require('../lib/jwtPromisify');
const SECRET = '31524021-1035-4acf-ba44-bc81678da21d';

exports.register = async (userData) => {
    const user = await User.exists({ username: userData.username });
    if (user) {
        throw new Error('Username is already taken!');
    }
    User.create(userData);
};

exports.login = async (username, password) => {
    const user = await User.findOne({ username });

    if (!user) {
        throw new Error('Wrong username or password');
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
        throw new Error('Wrong username or password');
    }

    const payload = {
        _id: user._id,
        username: user.username,
        email: user.email,
    };

    const token = await jwt.sign(payload, SECRET, { expiresIn: '1d' });

    return token;
};
