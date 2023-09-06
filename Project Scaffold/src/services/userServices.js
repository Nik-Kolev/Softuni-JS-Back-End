const User = require('../config/models/User');
const bcrypt = require('bcrypt');
const { tokenCreator } = require('../lib/tokenCreator');

exports.register = async (userData) => {
    const user = await User.exists({ username: userData.username });
    if (user) {
        throw new Error('Username is already taken!');
    }

    const newUser = await User.create(userData);
    return tokenCreator(newUser);
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

    return tokenCreator(user);
};
