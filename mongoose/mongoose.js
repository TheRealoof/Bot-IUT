const mongoose = require("mongoose");
const guildSchema = require("../mongoose/schamas/guild.js");
const db = process.env.db;
const util = require("../util.js")
const app = require("../index.js");

module.exports = {
    init: async () => {
        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
            autoIndex: false, // Don't build indexes
            poolSize: 10, // Maintain up to 10 socket connections
            serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
            socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
            family: 4 // Use IPv4, skip trying IPv6
        };

        mongoose.connection.on("connecting", () => util.log("Connection à la base données..."));
        mongoose.connection.on("connected", () => {
            util.log("Connecté à la base données");
            checkDataBase();
        });
        mongoose.connection.on("disconnecting", () => util.log("Déconnection de la base données..."));
        mongoose.connection.on("disconnected", () => util.log("Déconnecté de la base données"));

        await mongoose.connect(db, options);
    },
}

function checkDataBase() 
{
    var guilds = app.client.guilds.cache.array();
    for (var i = 0; i < guilds.length; i++) {
        const guild = guilds[i];
        guildSchema.findOne({ id: guild.id })
            .then(data => {
                if (data)
                {
                    util.log(guild.name + " (" + data.id + ") déja présent sur la base de données")
                }
                else
                {
                    createGuild(guild);
                }
            })
    }
}

async function createGuild(guild)
{
    createGuild = await new guildSchema( Object.assign( {id: guild.id} ) );
    createGuild.save()
        .then(data => {
            util.log(guild.name + " (" + data.id + ") ajouté à la base de données")
        })
        .catch(console.error);
}