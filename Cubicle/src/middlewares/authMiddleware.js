const { SECRET } = require('../config/secret');
const jwt = require('../lib/jwt');
exports.auth = async (req, res, next) => {
    const token = req.cookies['auth'];
    if (token) {
        try {
            const user = await jwt.verify(token, SECRET);
            req.user = user;
            res.locals.isAuthenticated = true;
            next();
        } catch (err) {
            res.clearCookie('auth');
            res.redirect('/login');
        }
    } else {
        next();
    }
};

exports.isAuth = (req, res, next) => {
    if (!req.user) {
        res.redirect('/login');
    }
    next();
};
