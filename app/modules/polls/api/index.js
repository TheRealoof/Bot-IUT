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
    const nb = req.query.nb;
    let polls;
    polls = await polls_db.getAllInGuild(guildid);
    if (nb > 0)
        polls = polls.slice(0, nb);
    polls = await AddResults(polls);
    res.send(polls);
});

ApiRequest("/poll", async (req, res, user) => {
    const guildid = req.query.guildid;
    const pollid = req.query.pollid;
    let poll;
    poll = await polls_db.get(guildid, pollid);
    console.log(poll);
    if (poll)
    {
        poll = await AddResults([poll]);
        res.send(poll[0]);
    }
    else
    {
        res.status(404);
        res.send("not found");
    }
});
