const mongoose = require("mongoose");

const guildSchema = mongoose.Schema({
    id: String,
    prefix: {
        "type": String,
        "default": "!"
    },
    logChannel: String
})

module.exports = mongoose.model("Guild", guildSchema);