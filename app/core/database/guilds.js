const mongoose = require("mongoose");

const guildSchema = mongoose.Schema({
    id: String,
    prefix: {
        "type": String,
        "default": "!"
    },
    apps: Array,
})

const guild = mongoose.model("Guild", guildSchema);

module.exports = {
    //insert: insert,
    get: get,
}

async function get(guildId)
{
    return await guild.findOne({id: guildId}).lean();
}