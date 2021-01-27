const router = require('express').Router();
const getUserById = require('../../functions/getUserById');
const getAllGuildWithUser = require('../../functions/getAllGuildWithUser');
const util = require('../../util');

router.get('/', async (req, res) => {
    if (req.user)
    {
        var user = await getUserById(req.user);
        
        userGuilds = await getAllGuildWithUser(user);
        console.log(userGuilds);

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