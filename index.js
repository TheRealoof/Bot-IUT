const dotEnv = require("dotenv").config();
const Discord = require("discord.js")
const client = new Discord.Client();
const mongoose = require("./mongoose/mongoose.js");
exports.client = client;
const express = require("./express/app.js");
const token = process.env.token;
const devMode = process.env.devMode == "true";
exports.devMode = devMode;

client.on('ready', () => require("./events/ready.js")());
client.on('message', msg => require("./events/message.js")(msg));
client.on('messageReactionAdd', (msgReaction, user) => require("./events/messageReactionAdd.js")(msgReaction, user));

async function init ()
{
    await client.login(token);
    await mongoose.init();
    express.init();
}

init();