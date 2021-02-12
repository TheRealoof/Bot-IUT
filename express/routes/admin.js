const router = require('express').Router();
const dashboard = require('../renderer/dashboard');
const bodyParser = require('body-parser');  
const guild = require('../../mongoose/requests/guild');


router.get('/:id/admin', async (req, res) => {
    dashboard.render(req, res, 'admin');
});

router.post('/:id/admin', bodyParser.urlencoded({ extended: false }), async (req, res) => {
    var guildId = req.params.id;

    const pollChannel = req.body.pollChannel
    await guild.update(guildId, {pollChannel: (pollChannel=="disabled") ? null : pollChannel});


    res.redirect("/dashboard"+req.url);
});

module.exports = router;