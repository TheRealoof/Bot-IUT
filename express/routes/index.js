const router = require('express').Router();
const home = require('./home');
const auth = require('./auth');
const dashboard = require('./dashboard');
const polls = require('./polls');

router.use("/", home);
router.use("/", dashboard);
router.use("/", polls);
router.use("/auth", auth);

module.exports = router;