const Client = require('../index');

module.exports = async (user_id) => {
    const guilds = Client.guilds.cache.filter(async guild => await guild.members.fetch(user_id)).array();
    return guilds;
}