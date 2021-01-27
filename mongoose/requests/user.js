const userSchema = require("../schamas/user");
const util = require('../../util');

module.exports = {
    
    insert: async (id) => {
        if ( !(await userSchema.findOne({id})) )
        {
            user = await new userSchema( Object.assign( {id: id} ) );
            await user.save()
                .then(data => {
                    util.log("(" + data.id + ") ajouté à la base de données");
                })
                .catch(util.log);
        }
        else
        {
            util.log("(" + id + ") déja présent dans la base de données");
        }
    },

    get: async (id) => {
        const user = await userSchema.findOne({id});
        return user;
    }

}