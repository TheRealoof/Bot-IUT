const mongoose = require("mongoose");

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

async function get(guildId, messageId)
{
    return await poll.findOne({guildId: guildId, messageId: messageId}).lean();
}

async function getAllInGuild(guildId)
{
    let res = await poll.find({guildId: guildId}).lean();
    
    return res.reverse();
}

async function getAll()
{
    return await poll.find({});
}