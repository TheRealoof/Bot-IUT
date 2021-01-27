const app = require('../index');
const client = app.client;

module.exports = async (id) => {
    let user = await client.users.fetch(id);
    return user;
} 