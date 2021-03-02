const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const auth = require('../middlewares/auth');

module.exports = (app) => {

    app.engine('hbs', handlebars({
        extname: 'hbs'
    }));
    app.set('views', './views');
    app.set('view engine', 'hbs');

    app.use(express.static('static'));

    app.use(bodyParser.urlencoded({
        extended: true
    }))

    app.use(cookieParser());
    
    app.use(auth());
};