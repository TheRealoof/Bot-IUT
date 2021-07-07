const Client = require('../index');

module.exports = async (user_id) => {
    let resultArray = [];

    for (let guild of Client.guilds.cache.array())
    {
        let res = await guild.members.fetch(user_id).catch(e => {});
        if (res) resultArray.push(guild);
    };

    return resultArray;
}
