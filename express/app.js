require('./strategies/discord');

const express = require('express');
const router = express.Router();
const passport = require('passport');
const app = express();
const util = require('../util');
const routes = require('./routes/index');
const mongoose = require('mongoose');
const session = require('express-session');
const Store = require('connect-mongo')(session);

module.exports = {
    
    init: () => {
        app.use( session ( {
            secret: 'secret',
            cookie: {
                maxAge: 1000 * 60 * 60 * 24
            },
            resave: false,
            saveUninitialized: false,
            store: new Store({mongooseConnection: mongoose.connection})
        }));

        app.use(passport.initialize());
        app.use(passport.session());

        app.set('views', './express/views');
        app.set('view engine', 'ejs');
        app.use("/dashboard", express.static('./express/public'));
        
        app.use('/dashboard', routes);

        // Route not found (404)
        app.use( (req, res, next) => {
            return res.status(404).render('error404.ejs', {url: req.url});
        });

        app.listen(2000);
        util.log("Site web en ligne");
    }
    
}