const Client = require('../index');

module.exports = async (user_id, guild_id) => {
    /*
    let resultArray = [];

    for (let guild of Client.guilds.cache.array())
    {
        let res = await guild.members.fetch(user_id).catch(e => {});
        if (res) resultArray.push(guild);
    };

    return resultArray;
    */

    const guild = await Client.guilds.fetch(guild_id);
    const user = await guild.members.fetch(user_id);
    const permissions = user.permissions;
    return permissions;
}
