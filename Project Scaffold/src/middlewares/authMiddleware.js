const exampleService = require('../services/exampleServices')

module.exports.isAuthorized = async (req, res, next) => {
    if (!req.user) {
        res.redirect('/404')
    } else {
        next()
    }
}

module.exports.isOwner = async (req, res, next) => {
    const propertyId = req.params.id;
    const singleProperty = await exampleService.getSinglePropertyById(propertyId);
    const userId = req.user ? req.user._id.toString() : null;
    if (userId === singleProperty.owner._id.toString()) {
        return next();
    }
    res.redirect(`/details/${propertyId}`);
};
