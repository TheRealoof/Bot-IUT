const message = require("../events/message");

module.exports = async (channel, messageId) => {
    return await channel.messages.fetch(messageId).catch(() => {});
}