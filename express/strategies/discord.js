require('dotenv');

const passport = require('passport');
const DiscordStrategy = require('passport-discord');
const userRequest = require('../../mongoose/requests/user');
const util = require('../../util');

passport.serializeUser( (id, done) => {
    done(null, id);
});

passport.deserializeUser( async (id, done) => {
    try {
        return id ? done(null, id) : done(null, null);
    }
    catch (e) {
        util.log(e);
        done(e, null);
    }
});

passport.use( new DiscordStrategy ({
        clientID: process.env.clientId,
        clientSecret: process.env.clientSecret,
        callbackURL: process.env.callbackURL,
        scope: ['identify', 'guilds'],
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            const {id, username, discriminator, avatar, guilds} = profile;
            userRequest.insert(id);
            done(null, id);
        }
        catch (e) {
            util.log(e);
        }
    })
);