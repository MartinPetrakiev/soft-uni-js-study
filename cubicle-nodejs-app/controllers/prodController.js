const { Router } = require('express');
const router = Router();
const prodService = require('../services/prodService');
const isAuth = require('../middlewares/isAuthenticated');

const validate = require('../middlewares/helpers/validate');

router.get('/', (req, res) => {
    prodService.getAll(req.query)
        .then(cubes => {
            res.render('index', { title: 'Browse', cubes });
        })
        .catch(() => res.status(400).end());
});

router.get('/create', isAuth, (req, res) => {
    res.render('create', { title: 'Create'});
});

router.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

router.get('/details/:id', async (req, res) => {
    const cubeId = req.params.id;
    let cube = await prodService.getByIdwithAccessorires(cubeId);
    res.render('details', { title: 'Details', cube });
});

router.post('/create', isAuth, validate, (req, res) => {
    prodService.createCube(req.body, req.user.id)
        .then(() => res.redirect('/'))
        .catch((err) => res.status(500).end());
});

module.exports = router;
