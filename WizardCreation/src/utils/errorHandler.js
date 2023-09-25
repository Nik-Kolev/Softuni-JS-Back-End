const mongoose = require('mongoose')
exports.errorHandler = (error) => {
    if (error instanceof mongoose.MongooseError) {
        return Object.values(error.errors).reduce((acc, x) => {
            acc[x.path] = x.properties.message;
            return acc;
        }, {});
    } else {
        return { error: error.message }
    }
}