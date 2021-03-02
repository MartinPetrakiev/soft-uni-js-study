const englishAlphanumericPattern = /^[A-Z0-9]+$/i;

module.exports = (req, res, next) => {
    const tempData = {
        username: req.body.username
    }
    if (req.body.username.length < 5) {
        const error = 'Username must be at least 5 characters.';
        return res.render('user/register', { notification: { error } });
    }
    if (!englishAlphanumericPattern.test(req.body.username)) {
        const error = 'Username should consist of only English letters and digits!';
        return res.render('user/register', { notification: { error } });
    }
    if (!englishAlphanumericPattern.test(req.body.password)) {
        const error = 'Password should consist of only English letters and digits!';
        return res.render('user/register', { notification: { error }, tempData });
    }
    if (req.body.password.length < 5) {
        const error = 'Password must be at least 5 characters.';
        return res.render('user/register', { notification: { error }, tempData });
    }
    if (req.body.password !== req.body.rePassword) {
        const error = 'Passwords don\'t match';
        return res.render('user/register', { notification: { error }, tempData });
    }
    next();
}