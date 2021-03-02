const { Router } = require('express');
const authService = require('../services/authService');
const prodService = require('../services/prodService');
const { COOKIE_NAME } = require('../config/config');
const isAuth = require('../middlewares/isAuth');
const isGuest = require('../middlewares/isGuest');
const authValidator = require('../middlewares/authValidator');

const router = Router();

router.get('/register', isGuest, (req, res) => {
    res.render('user/register');
});

router.get('/login', isGuest, (req, res) => {
    res.render('user/login');
});

router.get('/profile/:id', isAuth, async (req, res) => {
    try {
        const user = await authService.getUserData(req.params.id, res);
        const expenses = await prodService.getAll();
        let totalAmount = Object.entries(expenses)
            .map((x) => x = x[1])
            .filter(x => x.creator.toString() === req.user.id.toString())
            .reduce(((acc, x) => acc += x.total), 0);
        res.render('user/profile', { user, totalAmount: totalAmount.toFixed(2) });
    } catch (error) {
        return res.status(404).end();
    }
});

router.post('/login', isGuest, async (req, res) => {
    try {
        let token = await authService.login(req.body);
        res.cookie(COOKIE_NAME, token);
        res.redirect('/expenses');
    } catch (error) {
        res.render('user/login', {
            notification: { error: error.message },
            username: req.body.username
        });
    }
});

router.post('/register', isGuest, authValidator, async (req, res) => {
    const { username, password, amount } = req.body;
    try {
        let reg = await authService.register({ username, password, amount });
        let token = await authService.login({ username, password });
        res.cookie(COOKIE_NAME, token);
        res.redirect('/expenses');
    } catch (error) {
        res.render('user/register', {
            notification: { error: error.message },
            username: req.body.username
        });
    }
});

router.get('/logout', isAuth, (req, res) => {
    res.clearCookie(COOKIE_NAME);
    res.redirect('/');
});

module.exports = router;