const pollSchema = require("../schamas/poll");
const util = require('../../util');

module.exports = {
    insert: insert,
    get: get,
    getAllInGuild: getAllInGuild,
    getAll: getAll
}

async function insert(pollObject, messageId, channelId, guildId, userId)
{
    if ( !(await pollSchema.findOne({messageId: messageId, channelId: channelId, guildId: guildId, userId: userId, poll: pollObject})) )
    {
        poll = await new pollSchema( Object.assign( {messageId: messageId, channelId: channelId, guildId: guildId, userId: userId, poll: pollObject} ) );
        await poll.save()
            .then(data => {
                util.log("Sondage (" + data.messageId + ") ajouté à la base de données");
            })
            .catch(util.log);
    }
    else
    {
        util.log("Sondage (" + id + ") déja présent dans la base de données");
    }
}

async function get(guildId, channelId, messageId)
{
    return await pollSchema.findOne({guildId: guildId, channelId: channelId, messageId: messageId});
}

async function getAllInGuild(guildId)
{
    return await pollSchema.find({guildId: guildId});
}

async function getAll()
{
    return await pollSchema.find({});
}