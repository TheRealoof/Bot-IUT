const router = require('express').Router();
const passport = require('passport');
const getUserById = require('../../functions/getUserById');
const getGuildById = require('../../functions/getGuildById');
const getGuildMember = require('../../functions/getGuildMember');

router.get('/:id', async (req, res) => {
    var id = req.params.id;
    var guild = await getGuildById(id);


    var user = await getUserById(req.user);
    var guildmember = await getGuildMember(guild, user);

    if (guildmember)
    {
        var guildname = (guild.name).slice(0, 16);
        if (guildname != guild.name)
        {
            guildname = guildname + "...";
        }

        var guildicon = guild.iconURL();
        if (!guildicon)
        {
            guildicon = "/dashboard/images/default-icon.png";
        }

        res.render('dashboard', {
            guildicon: guildicon,
            guildname: guildname
        })
    }
});

module.exports = router;