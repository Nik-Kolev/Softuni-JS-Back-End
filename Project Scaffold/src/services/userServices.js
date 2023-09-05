const User = require('../config/models/User');

exports.register = (userData) => {
    console.log(userData);
    User.create(userData);
};

exports.login = (username, password) => {};
