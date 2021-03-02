const { Router } = require('express');
const prodService = require('../services/prodService');
const isAuth = require('../middlewares/isAuth');
const courseValidator = require('../middlewares/courseValidator');
const moment = require('moment');

const router = Router();

router.get('/', (req, res) => {
    prodService.getAll({})
        .then(tutorials => {
            const tutorialsArray = Object.entries(tutorials)
                .map((x) => x = x[1])
                .map(x => Object.assign(x, { enrolled: x.enrolled.length }))
                .sort((a, b) => b.enrolled - a.enrolled)
                .slice(0, 3);
            res.render('home/guest-home', { tutorialsArray });
        })
        .catch((err) => {
            console.log(err);
            res.status(400).end()
        });
});

router.get('/tutorials', isAuth, (req, res) => {
    prodService.getAll(req.query)
        .then(tutorials => {
            const tutorialsArray = Object.entries(tutorials)
                .map((x) => x = x[1])
                .sort((a, b) => Date.parse(a.dateCreated) - Date.parse(b.dateCreated))
                .map(x => ({...x, dateCreated: moment(x.dateCreated).format('MMMM Do YYYY, h:mm:ss a')}))
            res.render('home/user-home', { tutorialsArray });
        })
        .catch(() => res.status(400).end());
});

router.get('/course/create', isAuth, (req, res) => {
    res.render('course/create');
});

router.get('/course/details/:id', isAuth, async (req, res) => {
    let course = await prodService.getById(req.params.id);
    const creator = await course.creator.toString() === req.user.id.toString();
    const enrolled = await course.enrolled.find(el => el.toString() === req.user.id.toString());
    res.render('course/details', { course, creator, enrolled });
});

router.get('/course/enrolled/:id', isAuth, async (req, res) => {
    prodService.enrollCourse(req.params.id, req.user.id.toString())
        .then(() => res.redirect(`/course/details/${req.params.id}`))
        .then(() => res.status(400).end())
        .catch((err) => console.log(err));
});

router.get('/course/edit/:id', isAuth, async (req, res) => {
    let course = await prodService.getById(req.params.id);
    res.render('course/edit', { course });
});

router.get('/course/delete/:id', isAuth, async (req, res) => {
    prodService.deleteCourse(req.params.id)
        .then(() => res.redirect('/tutorials'))
        .then(() => res.status(400).end());
});

router.post('/course/create', isAuth, courseValidator, (req, res) => {
    prodService.createCourse(req.body, req.user.id)
        .then(() => res.redirect('/tutorials'))
        .catch((err) => res.status(500).end());
});

router.post('/course/edit/:id', isAuth, (req, res) => {
    prodService.editCourse(req.params.id, req.body)
        .then(() => res.redirect(`/course/details/${req.params.id}`))
        .catch((err) => res.status(400).end());
});


module.exports = router;