const ApiRequest = require('../../../core/api/ApiRequest');
const polls_db = require("../database/polls");

ApiRequest("/polls", async (req, res, user) => {
    const guildid = req.query.guildid;
    const polls = await polls_db.getAllInGuild(guildid);
    res.send(polls);
});