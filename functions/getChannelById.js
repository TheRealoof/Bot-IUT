module.exports = async (guild, channelId) => {
    return await guild.channels.resolve(channelId);
}