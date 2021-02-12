const Discord = require('discord.js');
const client = require('../index').client;
const Poll = require('../mongoose/requests/poll');
const getGuildById = require('../functions/getGuildById');

module.exports = async (messageReaction, user) => {
    const emojiName = messageReaction.emoji.name;
    const message = messageReaction.message;
    const poll = await Poll.get(message.channel.guild.id, message.channel.id, message.id);

    if (poll)
    {
        const reactions = message.reactions.cache.array()
        await fetchReactions(reactions);
        const userReactions = reactions.filter(reaction => reaction.users.cache.array().find(_user => user.id == _user.id))
        if (userReactions.length > 1) 
        {
            messageReaction.users.remove(user);
            return;
        }

        const responses = poll.poll.responses;
        var validEmoji = false;
        var i = 0;
        while (!validEmoji && i < responses.length)
        {
            if (emojiName == responses[i].emoji)
            {
                validEmoji = true;
            }
            i++;
        }
        if (!validEmoji)
        {
            messageReaction.remove();
        }
    }
}

async function fetchReactions(reactions)
{
    for (var i = 0; i < reactions.length; i++)
    {
        const reaction = await reactions[i].users.fetch()
        console.log(reaction);
    }
}