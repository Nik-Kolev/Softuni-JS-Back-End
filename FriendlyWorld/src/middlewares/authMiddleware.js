const jwt = require('../utils/jwtPromisify')
const SECRET = require('../config/additionalConfigInfo')

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