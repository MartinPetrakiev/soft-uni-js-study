const englishAlphanumericPattern = /^[A-Z0-9]+$/i;

module.exports = (req, res, next) => {
    const tempData = {
        username: req.body.username
    }
    const errors = {
        username: 'Username should be at least 4 characters and should consist only english letters and digits.',
        passwordChars: 'Password should consist of only English letters and digits!',
        passwordLength: 'Password should be at least 4 characters long.',
        rePassword: 'Passwords don\'t match',
        amount: 'Amount should be positive number!'
    }
    if (req.body.username.length < 4 || !englishAlphanumericPattern.test(req.body.username)) {
        return res.render('user/register', { notification: { error: errors.username } });
    }
    if (!englishAlphanumericPattern.test(req.body.password)) {
        return res.render('user/register', { notification: { error: errors.passwordChars }, tempData });
    }
    if (req.body.password.length < 4) {
        return res.render('user/register', { notification: { error: errors.passwordLength }, tempData });
    }
    if (req.body.password !== req.body.rePassword) {
        return res.render('user/register', { notification: { error: errors.rePassword }, tempData });
    }
    if (req.body.amount) {
        if (req.body.amount.startsWith('$')) {
            req.body.amount = Number(req.body.amount.substring(1));
        }
        if (req.body.amount < 0) {
            return res.render('user/register', { notification: { error: errors.amount }, tempData });
        }
    } else {
        req.body.amount = 0;
    }

    next();
}