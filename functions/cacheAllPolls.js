const Poll = require('../mongoose/requests/poll');
const getGuildById = require('./getGuildById');
const util = require('../util');

module.exports = async () => {
    const polls = await Poll.getAll();

    for (var i = 0; i < polls.length; i++)
    {
        const guild = await getGuildById(polls[i].guildId);
        const channel = await guild.channels.resolve(polls[i].channelId);
        const message = await channel.messages.fetch(polls[i].messageId).catch(() => {});
    }

    util.log("Les sondages ont été mis en cache")
}