const User = require('../config/models/User');

exports.register = (userData) => {
    User.create(userData);
};

exports.login = (username, password) => {};
