const router = require('express').Router();
const getUserById = require('../../functions/getUserById');
const getAllGuildWithUser = require('../../functions/getAllGuildWithUser');
const util = require('../../util');

router.get('/', async (req, res) => {
    if (req.user)
    {
        var user = await getUserById(req.user);
        
        var userGuilds;
        
        if (user)
            userGuilds = await getAllGuildWithUser(user);

        res.render('servers', {
            guilds: userGuilds
        })
    }
    else
    {
        res.render('connect');
    }
})

module.exports = router;