const mongoose = require('mongoose')
exports.errorHandler = (error) => {
    if (error instanceof mongoose.MongooseError) {
        return Object.values(error.errors).reduce((acc, x) => {
            acc[x.path] = x.properties.message;
            return acc;
        }, {});
    } else {
        if (error.message.includes('email')) {
            return { email: error.message }
        }
        return { error: error.message }
    }
}