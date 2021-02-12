const guildSchema = require("../schamas/guild");
const util = require('../../util');

module.exports = {
    
    insert: async (id) => {
        if ( !(await guildSchema.findOne({id})) )
        {
            user = await new guildSchema( Object.assign( {id: id} ) );
            await user.save()
                .then(data => {
                    util.log("(" + data.id + ") ajouté à la base de données");
                })
                .catch(util.log);
        }
    },

    get: async (id) => {
        return await get(id);
    },

    update: async (id, values) => {
        var guild = await get(id);
        await guild.updateOne(values, (err, result) => {
            if (err) {console.error(err)}
        })
    }

}

async function get (id) {
    const guild = await guildSchema.findOne({id});
    return guild;
}