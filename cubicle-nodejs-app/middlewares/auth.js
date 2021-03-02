const jwt = require('jsonwebtoken');
const env = process.env.NODE_ENV.trim() || 'development';
const { COOKIE_NAME, SECRET } = require('../config/config')[env];

module.exports = function() {
    return (req, res, next) => {
        let token = req.cookies[COOKIE_NAME];
        if(token) {
            jwt.verify(token, SECRET, function(err, decoded) {
                if (err) {
                    res.clearCookie(COOKIE_NAME);
                } else {
                    req.user = decoded;
                    res.locals.isAuthenticated = true;
                }
            });
        }
        next();
    }
}