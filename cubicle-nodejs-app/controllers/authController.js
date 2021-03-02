const { Router } = require('express');
const authService = require('../services/authService');
const env = process.env.NODE_ENV.trim() || 'development';
const { COOKIE_NAME } = require('../config/config')[env];
const isAuth = require('../middlewares/isAuthenticated');
const isGuest = require('../middlewares/isGuest');

const router = Router();

router.get('/login', isGuest, (req, res) => {
    res.render('login');
});

router.get('/register', isGuest, (req, res) => {
    res.render('register');
});

router.post('/login', isGuest, async (req, res) => {
    try {
        let token = await authService.login(req.body);
        res.cookie(COOKIE_NAME, token);
        res.redirect('/');
    } catch (error) {
        res.render('login', { error });
    }
});

router.post('/register', isGuest, async (req, res) => {
    const { username, password, repeatPassword } = req.body;

    if (password !== repeatPassword) {
        let errors = [{ message: 'Passwords don\'t match!' }];
        res.render('register', { errors });
        return;
    }

    try {
        let reg = await authService.register({ username, password });
        res.redirect('/auth/login');
    } catch (error) {
        let errors = Object.keys(error.errors).map(x => ({ message: error.errors[x].message }));
        res.render('register', { errors });
    }
});

router.get('/logout', isAuth, (req, res) => {
    res.clearCookie(COOKIE_NAME);
    res.redirect('/');
});

module.exports = router;