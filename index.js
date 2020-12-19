require("dotenv").config();

const Discord = require("discord.js")

const client = new Discord.Client();

client.login(process.env.token);

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);

    // Set the client user's activity
    client.user.setActivity('discord.js', { type: 'PLAYING' })
        .then(presence => console.log(`Activity set to ${presence.activities[0].name}`))
        .catch(console.error);
});

client.on('message', msg => {
    if (msg.content === 'ping') {
      msg.reply('pong');
    }
});