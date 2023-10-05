const mongoose = require("mongoose")

module.exports = function errorHandler(error) {
    if (error instanceof mongoose.Error.ValidationError) {
        return Object.values(error.errors).reduce((acc, x) => {
            if (x.path == 'years' && x.stringValue) {
                acc[x.path] = 'Years must be a positive number !'
                return acc
            }
            acc[x.path] = x.message
            return acc
        }, {})
    } else if (error instanceof mongoose.Error.CastError) {
        if (error.path === 'years') {
            return { years: 'Years must be a positive number !' };
        }
    } else {
        return { error: error.message }
    }
}
