const getUserById = require('../../functions/getUserById');
const getGuildById = require('../../functions/getGuildById');
const getChannelById = require('../../functions/getChannelById');
const getMessageById = require('../../functions/getMessageById');
const getGuildMember = require('../../functions/getGuildMember');
const Guild = require('../../mongoose/requests/guild');
const Poll = require('../../mongoose/requests/poll');

module.exports = {

    render: async (req, res, view) => {
        var id = req.params.id;
        var guild = await getGuildById(id);
    
        if (guild)
        {
            if (!req.user)
            {
                res.redirect('/dashboard');
            }
            else
            {
                var user = await getUserById(req.user);
                var guildmember = await getGuildMember(guild, user);

                if (req.url.endsWith("admin") && !guildmember.hasPermission('ADMINISTRATOR'))
                {
                    res.status(404).render('error404.ejs', {url: '/dashboard' + req.url});
                    return
                }

                var guildname = (guild.name).slice(0, 16);
                if (guildname != guild.name)
                {
                    guildname = guildname + "...";
                }
        
                var guildicon = guild.iconURL('png', true, 256);
                if (!guildicon)
                {
                    guildicon = "/dashboard/images/default-icon.png";
                }

                var guild_db = await Guild.get(id);

                if (req.url.includes("poll") && !guild_db.pollChannel)
                {
                    res.status(404).render('error404.ejs', {url: '/dashboard' + req.url});
                    return
                }

                var polls_db = await Poll.getAllInGuild(id);

                // Ajoute le nombre de votes à l'objet poll
                for (var i = 0; i < polls_db.length; i++)
                {
                    const guild = await getGuildById(polls_db[i].guildId)
                    const channel = await getChannelById(guild, polls_db[i].channelId)
                    const message = await getMessageById(channel, polls_db[i].messageId);
                    
                    if (message)
                    {
                        for (var j = 0; j < polls_db[i].poll.responses.length; j++)
                        {
                            const reactions = message.reactions.cache.array();
                            const responseReaction = reactions.find(reaction => reaction.emoji.name == polls_db[i].poll.responses[j].emoji)
                            if (responseReaction)
                            {
                                polls_db[i].poll.responses[j].votes = responseReaction.count;
                            }
                            else
                            {
                                polls_db[i].poll.responses[j].votes = 0;
                            }
                            
                        }
                    }
                    
                }

                var poll_id;
                if (req.params.pollId)
                {
                    poll_id = req.params.pollId;
                }
        
                res.render(view, {
                    guildicon: guildicon,
                    guildname: guildname,
                    guild: guild,
                    guildmember: guildmember,
                    guild_db: guild_db,
                    polls_db: polls_db,
                    poll_id: poll_id,
                    url: "/dashboard/"+id
                })
            }
        }
        else
        {
            res.status(404).render('error404.ejs', {url: '/dashboard' + req.url});
        }
    }

}