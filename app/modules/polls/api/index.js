const ApiRequest = require('../../../core/api/ApiRequest');
const polls_db = require("../database/polls");
const Client = require('../../../core/bot');

async function AddResults(polls)
{
    let result = polls;
    for (let i = 0; i < polls.length; i++)
    {
        const poll = polls[i];
        var reactions;
        try {
            const guild = await Client.guilds.fetch(poll.guildId);
            const channel = await guild.channels.resolve(poll.channelId);
            const message = await channel.messages.fetch(poll.messageId);
            reactions = message.reactions;
        }
        catch (e) {}
        if (reactions)
            for (let j = 0; j < poll.poll.responses.length; j++)
            {
                const response = poll.poll.responses[j];
                const reaction = await reactions.resolve(response.emoji);
                const count = (reaction) ? reaction.count : 0;
                result[i].poll.responses[j].votes = count;
            }
    }
    return result;
}

ApiRequest("/polls", async (req, res, user) => {
    const guildid = req.query.guildid;
    let polls;
    polls = await polls_db.getAllInGuild(guildid);
    polls = await AddResults(polls);
    res.send(polls);
});
