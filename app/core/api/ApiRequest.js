const Server = require('./index');
const DiscordApiRequest = require('./DiscordApiRequest');

module.exports = (url, func) => {
    Server.get(url, async (req, res) => {
        const authorization = req.headers.authorization;
        if (authorization)
        {
            const response = await DiscordApiRequest("https://discord.com/api/users/@me", authorization);
            const user = response.data;
            res.status(response.status);
            func(req, res, user);
        }
        else
        {
            res.status(401);
            res.send("Unauthorized");
        }
    });
}