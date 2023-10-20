const jwt = require('../utils/jwtPromisify')
const SECRET = require('../config/additionalConfigInfo')
const auctionServices = require('../services/auctionServices')

module.exports.authentication = async (req, res, next) => {
    const token = req.cookies['token']

    if (token) {
        try {
            const decodedToken = await jwt.verify(token, SECRET)
            req.user = decodedToken
            res.locals.user = decodedToken
            res.locals.isAuth = true
        } catch (err) {
            res.clearCookie('token')
            res.redirect('/login')
        }
    }
    next()
}

module.exports.isAuthorized = async (req, res, next) => {
    if (!req.user) {
        res.redirect('/404')
    } else {
        next()
    }
}

module.exports.isOwner = async (req, res, next) => {
    const auction = await auctionServices.getSingleAuctionById(req.params.id)
    if (req.user?._id == auction.owner._id) {
        return res.redirect(`/details/${req.params.id}`)
    }
    next()
}