const { Router } = require('express');
const authService = require('../services/authService');
const { COOKIE_NAME } = require('../config/config');
const isAuth = require('../middlewares/isAuth');
const authValidator = require('../middlewares/authValidator');

const router = Router();

router.get('/register', (req, res) => {
    res.render('user/register');
});

router.get('/login', (req, res) => {
    res.render('user/login');
});

// router.get('/profile/:id', isAuth, async (req, res) => {
//     try {
//         let user = await authService.getUserData(req.params.id, res);
//         res.render('user/profile', { user });
//     } catch (error) {
//         return res.status(404).end();
//     }
// });

router.post('/login', async (req, res) => {
    try {
        let token = await authService.login(req.body);
        res.cookie(COOKIE_NAME, token);
        res.redirect('/tutorials');
    } catch (error) {
        res.render('user/login', {
            notification: { error: error.message },
            username: req.body.username
        });
    }
});

router.post('/register', authValidator, async (req, res) => {
    const { username, password } = req.body;

    try {
        let reg = await authService.register({ username, password });
        res.redirect('/auth/login');
    } catch (error) {
        res.render('user/register', {
            notification: { error: error.message },
            username: req.body.username
        });
    }
});

router.get('/logout', (req, res) => {
    res.clearCookie(COOKIE_NAME);
    res.redirect('/');
});

module.exports = router;