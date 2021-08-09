const Express = require('express');
const Cors = require('cors');
const Server = Express();
module.exports = Server;
const Port = process.env.PORT;
const ApiRequest = require('./ApiRequest');

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

ApiRequest("/server-settings", async (req, res, user) => {
    const guildId = req.query.server_id;
    const settings = [
        {
            appName: "polls",
            active: true,
            pollChannel: "0",
        }
    ]
    res.send(settings);
});
