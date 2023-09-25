const jsonwebtoken = require('jsonwebtoken');

module.exports.sign = (payload, secret, options) => {
    return new Promise((resolve, reject) => {
        jsonwebtoken.sign(payload, secret, options, (error, result) => {
            if (!error) {
                return resolve(result)
            }
            reject(error)
        })
    })
}

module.exports.verify = (payload, secret, options) => {
    return new Promise((resolve, reject) => {
        jsonwebtoken.verify(payload, secret, options, (error, result) => {
            if (!error) {
                resolve(result)
            }
            reject(error)
        })
    })
}