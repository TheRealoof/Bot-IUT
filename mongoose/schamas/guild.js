const mongoose = require("mongoose");

const guildSchema = mongoose.Schema({
    id: String,
    prefix: {
        "type": String,
        "default": "!"
    },
    logChannel: String,
    pollChannel: String
})

module.exports = mongoose.model("Guild", guildSchema);