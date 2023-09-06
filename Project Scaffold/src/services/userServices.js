const User = require('../config/models/User');

exports.register = async (userData) => {
    const user = await User.exists({ username: userData.username });
    if (!user) {
        User.create(userData);
    } else {
        throw new Error('Username is already taken!');
    }
};

exports.login = (username, password) => {};
