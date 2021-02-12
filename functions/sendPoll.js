const app = require('../index');
const Discord = require('discord.js');

module.exports = async (channel, poll) => {
    
    var embed = new Discord.MessageEmbed();
    embed.setTitle(poll.message);

    var description = "";
    for (var i = 0; i < poll.responses.length; i++)
    {
        const pollResponse = poll.responses[i];
        description = description + pollResponse.emoji + "  " + pollResponse.response + "\n";
    }
    embed.setDescription(description);
    embed.setColor("AQUA");

    const pollMessage = channel.send(embed);
    return pollMessage;
}