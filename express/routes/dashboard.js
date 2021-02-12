const router = require('express').Router();
const passport = require('passport');
const admin = require('./admin');
const dashboard = require('../renderer/dashboard');

router.use("/", admin);

router.get('/:id', async (req, res) => {
    dashboard.render(req, res, "overview");
});

module.exports = router;