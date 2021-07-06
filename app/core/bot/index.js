const Discord = require('discord.js');
const Client = new Discord.Client();
const Token = process.env.BOT_TOKEN;

module.exports = Client;

Client.login(Token);

Client.on('ready', () => {
    console.log("Bot connecté");
});