const productionController = require('../controllers/prodController');
const accessoriesController = require('../controllers/accessoryController');
const authController = require('../controllers/authController');
const isAuth = require('../middlewares/isAuthenticated');

module.exports = (app) => {
    app.use('/', productionController);
    app.use('/auth', authController);
    app.use('/accessories', isAuth, accessoriesController);
    app.use('*', (req, res) => {
        res.render('404', { title: 'Not Found' });
    });
    
};
