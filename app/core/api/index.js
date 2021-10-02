const Express = require('express');
const Cors = require('cors');
const Server = Express();
module.exports = Server;
const Port = process.env.PORT;
const ApiRequest = require('./ApiRequest');
const guild_db = require('../database/guilds');

Server.listen(Port);

Server.use(Cors());

// Add Access Control Allow Origin headers
Server.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

ApiRequest("/me", async (req, res, user) => {
    res.send(user);
});

ApiRequest("/servers", async (req, res, user) => {
    const guilds = await require('../bot/functions/GetGuildsWithUser')(user.id);
    res.send(guilds);
});

ApiRequest("/server-apps", async (req, res, user) => {
    const guildId = req.query.server_id;
    const isAdmin = (await require('../bot/functions/GetUserPermissions')(user.id, guildId)).has("ADMINISTRATOR");
    const guild = await guild_db.get(guildId);
    let apps = guild.apps;
    apps.push({
        name: "settings",
        enabled: isAdmin,
    })
    console.log(apps);
    res.send(apps);
});
