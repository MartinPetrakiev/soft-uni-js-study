const validator = require('validator');

function isStrongPasswordMiddleware(req, res, next) {
    let password = req.body.password;
    
    let isStrongPassword = validator.isStrongPassword(password, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    });

    if (!isStrongPassword) {
        return res.render('register', { error: { message: 'Password too weak!' }, username: req.body.username });
    }

    next();
}

module.exports = {
    isStrongPasswordMiddleware
}