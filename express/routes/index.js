const router = require('express').Router();
const home = require('./home');
const auth = require('./auth');
const dashboard = require('./dashboard');

router.use("/", home);
router.use("/", dashboard)
router.use("/auth", auth);

module.exports = router;