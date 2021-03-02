const { Router } = require('express');
const prodService = require('../services/prodService');
const accessoryService = require('../services/accessoryService');
const isAuth = require('../middlewares/isAuthenticated');

const router = Router();

router.get('/create', isAuth, (req, res) => {
    res.render('createAccessory', { title: 'Add an Accessory' });
});

router.get('/attach/:id', isAuth, async (req, res) => {
    const cubeId = req.params.id;
    let cube = await prodService.getById(cubeId);
    let accessories = await accessoryService.getAllUnattached(cube.accessories);

    res.render('attachAccessory', { title: 'Add accssory to Cube', cube, accessories });
});

//TODO: validation
router.post('/create', isAuth, (req, res) => {
    accessoryService.create(req.body)
        .then(() => res.redirect('/'))
        .catch(() => res.status(500).end());
});

router.post('/attach/:id', isAuth, (req, res) => {
    accessoryService.attach(req.params.id, req.body.accessory)
        .then(() => res.redirect(`/details/${req.params.id}`))
        .catch(() => res.status(500).end());
});

router.get('/edit/:id', isAuth, async (req, res) => {
    const cubeId = req.params.id;
    let cube = await prodService.getById(cubeId);

    res.render('editCube', { title: 'Edit Cube', cube });
});

router.get('/delete/:id', isAuth, async (req, res) => {
    const cubeId = req.params.id;
    let cube = await prodService.getById(cubeId);
    
    res.render('deleteCube', { title: 'Delete Cube', cube });
});

router.post('/delete/:id', isAuth, (req, res) => {
    accessoryService.deleteCube(req.params.id)
        .then(() => res.redirect('/'))
        .then(() => res.status(400).end());
});

router.post('/edit/:id', isAuth, (req, res) => {
    accessoryService.editCube(req.params.id, req.body)
        .then(() => res.redirect('/'))
        .then(() => res.status(400).end());
});


module.exports = router;