require('dotenv');

const util = require("../util.js");
const app = require("../index.js");

module.exports = (client) => {
    util.log(app.client.user.tag + " connecté !");

    var activity = process.env.activity;
    // Set the client user's activity
    app.client.user.setActivity(activity, { type: 'PLAYING' })
        .then(presence => util.log("Activité définie : " + presence.activities[0].name))
        .catch(console.error);
}