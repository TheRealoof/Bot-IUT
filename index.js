require("dotenv").config();

const Discord = require("discord.js")

const client = new Discord.Client();

var http = require('http');

//create a server object:
http.createServer(function (req, res) {
    res.write('Hello World!'); //write a response to the client
    res.end(); //end the response
}).listen(8080); //the server object listens on port 8080

client.login(process.env.token);

client.on('ready', () => {
    log(client.user.tag + " connecté !");

    // Set the client user's activity
    client.user.setActivity('discord.js', { type: 'PLAYING' })
        .then(presence => log("Activité définie : " + presence.activities[0].name))
        .catch(console.error);
});

client.on('message', msg => {
    if (msg.content === 'ping') {
        msg.reply('pong');
    }
});

function getDate()
{
    var date = new Date(Date.now());
    var seconds = "00" + date.getSeconds();
    var minutes = "00"+ date.getMinutes();
    var hours = "00" + date.getHours();
    var days = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    return days + "/" + month + "/" + year + " - " + hours.substr(hours.length-2,2) + ":" + minutes.substr(minutes.length-2,2) + ":" + seconds.substr(seconds.length-2,2);
}

function log(text)
{
    var message = "[" + getDate() + "] " + text;
    console.log(message);
    client.guilds.fetch("752503394450669668")
        .then(guild => guild.channels.cache.get("773844590133641246").send(message)
            .catch(console.error)
        )
        .catch(log);
}