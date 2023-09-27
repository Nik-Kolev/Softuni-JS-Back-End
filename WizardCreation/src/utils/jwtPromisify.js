const jsonwebtoken = require('jsonwebtoken');

module.exports.combine = (term, payload, secret, options) => {
    if (typeof jsonwebtoken[term] === 'function') {
        return new Promise((resolve, reject) => {
            jsonwebtoken[term](payload, secret, options, (error, result) => {
                if (!error) {
                    return resolve(result)
                }
                return reject(error)
            })
        })
    }
    throw new Error(`${term} cannot be a JsonWebToken functionality !`)
}


// module.exports.sign = (payload, secret, options) => {
//     return new Promise((resolve, reject) => {
//         jsonwebtoken.sign(payload, secret, options, (error, result) => {
//             if (!error) {
//                 return resolve(result)
//             }
//             return reject(error)
//         })
//     })
// }

// module.exports.verify = (payload, secret) => {
//     return new Promise((resolve, reject) => {
//         jsonwebtoken.verify(payload, secret, (error, result) => {
//             if (!error) {
//                 return resolve(result)
//             }
//             return reject(error)
//         })
//     })
// }