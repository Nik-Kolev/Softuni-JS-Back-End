const { SECRET } = require('../config/additionalConfigParams');
const jwt = require('../lib/jwtPromisify');

exports.authentication = async (req, res, next) => {
    const token = req.cookies['token'];
    if (token) {
        try {
            const decoded = await jwt.verify(token, SECRET);
            req.user = decoded;
            // CHECK
            res.locals.user = decoded;
            res.locals.isAuthenticated = true;
        } catch (err) {
            res.clearCookie('token');
            res.redirect('/login');
        }
    }
    next();
};

exports.authorization = (req, res, next) => {
    if (!req.user) {
        res.redirect('login');
    }
    next();
};
