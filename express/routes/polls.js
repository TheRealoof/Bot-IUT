const router = require('express').Router();
const dashboard = require('../renderer/dashboard');
const bodyParser = require('body-parser');
const getGuildById = require('../../functions/getGuildById');
const Guild = require('../../mongoose/requests/guild');
const sendPoll = require('../../functions/sendPoll');
const pollObject = require('../../classes/poll');
const pollResponseObject = require('../../classes/pollResponse');


router.get('/:id/polls', async (req, res) => {
    dashboard.render(req, res, 'polls');
});

router.get('/:id/polls/create', async (req, res) => {
    dashboard.render(req, res, 'createpoll');
});

router.post('/:id/polls/create', bodyParser.urlencoded({ extended: false }), async (req, res) => {
    
    const userId = req.user;
    const guildId = req.params.id;
    const guild_db = await Guild.get(guildId);
    const guild = await getGuildById(guildId);
    const channels = guild.channels.cache.array();
    const pollChannel = channels.find(channel => channel.id == guild_db.pollChannel);

    var poll;
    if (req.body.message && req.body.response0 && req.body.response1 && req.body.message != "" && req.body.response0 != "" && req.body.response1 != "")
    {
        poll = new pollObject(req.body.message);
        for (var i = 0; i < 10; i++)
        {
            var response = eval("req.body.response"+i);
            if (response)
            {
                poll.addResponse(new pollResponseObject(getEmoji(i), response));
            }
        }
    }

    if (poll)
    {
        const pollMessage = await sendPoll(pollChannel, poll);
        await require('../../mongoose/requests/poll').insert(poll, pollMessage.id, pollChannel.id, guild.id, userId);
    }

    res.redirect('/dashboard/' + req.params.id + '/polls');
});

router.get('/:id/polls/:pollId', async (req, res) => {
    dashboard.render(req, res, 'poll-details');
});

module.exports = router;

function getEmoji (i)
{
    switch (i)
    {
        case 0: 
            return "1️⃣";
            break;

        case 1: 
            return "2️⃣";
            break;

        case 2: 
            return "3️⃣";
            break;

        case 3: 
            return "4️⃣";
            break;

        case 4: 
            return "5️⃣";
            break;

        case 5: 
            return "6️⃣";
            break;

        case 6: 
            return "7️⃣";
            break;

        case 7: 
            return "8️⃣";
            break;

        case 8: 
            return "9️⃣";
            break;

        case 9: 
            return "🔟";
            break;

        default: 
            return "";
            break;
    }
}