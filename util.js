const app = require("./index.js");

function getDate ()
{
    var date = new Date(Date.now());
    var offset = date.getTimezoneOffset()/60;
    date = new Date(date.valueOf() + (1 + offset)*1000*60*60)
    var seconds = "00" + date.getSeconds();
    var minutes = "00"+ date.getMinutes();
    var hours = "00" + date.getHours();
    var days = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    return days + "/" + month + "/" + year + " - " + hours.substr(hours.length-2,2) + ":" + minutes.substr(minutes.length-2,2) + ":" + seconds.substr(seconds.length-2,2);
}

module.exports = {

    log : (text) =>
    {
        var message = "[" + getDate() + "] " + text;
        console.log(message);
        if (!app.devMode)
        {
            app.client.guilds.fetch("752503394450669668")
                .then(guild => guild.channels.cache.get("773844590133641246").send(message)
                    .catch(console.error)
                )
                .catch(e => console.error(e));
        }
    }
}