const Discord = require('discord.js');
const Client = new Discord.Client();
const Token = process.env.BOT_TOKEN;
const BotName = process.env.BOT_NAME;

module.exports = Client;

Client.login(Token);

console.log("Connexion du bot...")

Client.on('ready', () => {
    console.log("Bot connecté");
    if (Client.user.username != BotName)
    {
        Client.user.setUsername(BotName)
        .then(user => console.log(`Bot renommé : ${user.username}`))
        .catch(console.error);
    }
});