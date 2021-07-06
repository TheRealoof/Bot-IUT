require('dotenv').config();

const DiscordClient = require('./core/bot');

const Website = require('./core/api');

require('./core/database');

require('./modules');
