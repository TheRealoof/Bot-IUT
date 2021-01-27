const app = require('../index');
const client = app.client;
const getUserById = require('./getUserById');
const getGuildById = require('./getGuildById');

module.exports = async (guild, user) => {
    let member = await guild.members.fetch(user);
    return member;
} 