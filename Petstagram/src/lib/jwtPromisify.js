const jsonwebtoken = require('jsonwebtoken');

module.exports.sign = (payload, secret, options) => {
    return new Promise((resolve, reject) => {
        jsonwebtoken.sign(payload, secret, options, (error, result) => {
            if (!error) {
                return resolve(result);
            }
            reject(error);
        });
    });
};

module.exports.verify = (token, secret) => {
    return new Promise((resolve, reject) => {
        jsonwebtoken.verify(token, secret, (error, result) => {
            if (!error) {
                return resolve(result);
            }
            reject(error);
        });
    });
};
