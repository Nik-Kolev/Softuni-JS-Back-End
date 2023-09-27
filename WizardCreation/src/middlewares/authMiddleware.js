const { SECRET } = require("../configurations/configParams");
const jwt = require("../utils/jwtPromisify");

module.exports.authorization = async (req, res, next) => {
    const token = req.cookies['token']
    if (token) {
        try {
            const decoded = await jwt.verify(token, SECRET)
            req.user = decoded
            res.locals.user = decoded
            res.locals.isAuth = true
        } catch (err) {
            res.clearCookie('token')
            res.redirect('/login')
        }
    }
    next()
}

module.exports.authentication = (req, res, next) => {
    if (!req.user) {
        res.redirect('login')
    }
    next()
}