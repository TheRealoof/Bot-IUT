const app = require('../index');
const client = app.client;
const getGuildMember = require('./getGuildMember');

module.exports = async (user) => {
    let botGuilds = client.guilds.cache.array();
    let guilds = [];
    
    for (var i = 0; i < botGuilds.length; i++)
    {
        let guildmember = await getGuildMember(botGuilds[i], user);
        if (guildmember)
        {
            guilds.push({
                guild: botGuilds[i],
                member: guildmember
            });
        }
    }

    return guilds;
} 