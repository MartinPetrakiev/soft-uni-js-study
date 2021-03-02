const homeController = require('../controllers/homeController');
const authController = require('../controllers/authController');

module.exports = (app) => {
    app.use('/', homeController);
    app.use('/auth', authController);
    app.use('*', authController);
    app.use('*', (req, res) => {
        res.render('home/404', { title: 'Not Found' });
    });
};