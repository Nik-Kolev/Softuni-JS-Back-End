const mongoose = require("mongoose")

module.exports = function errorHandler(error) {
    if (error instanceof mongoose.Error.ValidationError) {
        return Object.values(error.errors).reduce((acc, x) => {
            acc[x.path] = x.message
            return acc
        }, {})
    } else {
        if (error.message.includes('email')) {
            return { email: error.message }
        }
        return { error: error.message }
    }
}