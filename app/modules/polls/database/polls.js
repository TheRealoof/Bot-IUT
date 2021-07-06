const mongoose = require("mongoose");
const Client = require('../../../core/bot');

const pollSchema = mongoose.Schema({
    messageId: String,
    channelId: String,
    guildId: String,
    userId: String,
    poll: {
        message: String,
        responses: [{
            emoji: String,
            response: String
        }]
    }
});

const poll = mongoose.model("Poll", pollSchema);

module.exports = {
    //insert: insert,
    get: get,
    getAllInGuild: getAllInGuild,
    getAll: getAll
}

/*async function insert(pollObject, messageId, channelId, guildId, userId)
{
    if ( !(await poll.findOne({messageId: messageId, channelId: channelId, guildId: guildId, userId: userId, poll: pollObject})) )
    {
        poll = await new poll( Object.assign( {messageId: messageId, channelId: channelId, guildId: guildId, userId: userId, poll: pollObject} ) );
        await poll.save()
            .then(data => {
                //util.log("Sondage (" + data.messageId + ") ajouté à la base de données");
            })
            .catch(util.log);
    }
    else
    {
        //util.log("Sondage (" + id + ") déja présent dans la base de données");
    }
}*/

async function get(guildId, channelId, messageId)
{
    return await poll.findOne({guildId: guildId, channelId: channelId, messageId: messageId});
}

async function getAllInGuild(guildId)
{
    let polls = await poll.find({guildId: guildId});
    polls = await AddResults(polls);
    return polls;
}

async function getAll()
{
    return await poll.find({});
}

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
        catch (e) {
        }

        if (reactions)
            for (let j = 0; j < poll.poll.responses.length; j++)
            {
                const response = poll.poll.responses[j];
                const reaction = await reactions.resolve(response.emoji);
                const count = (reaction) ? reaction.count : 0;
                result[i].poll.responses[j].votes = count;
                console.log("votes : " + result[i].poll.responses[j].votes);
            }
    }

    return result;
}