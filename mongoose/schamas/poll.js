const mongoose = require("mongoose");
const pollClass = require('../../classes/poll');

const pollSchema = mongoose.Schema({
    messageId: String,
    channelId: String,
    guildId: String,
    userId: String,
    poll: {
        message: String,
        responses: [{
            emoji: String,
            response: String
        }]
    }
})

module.exports = mongoose.model("Poll", pollSchema);
