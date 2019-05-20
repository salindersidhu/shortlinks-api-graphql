const crypto = require('crypto');

/* Base configuration */
const config = {
    development: {
        PORT: 8000,
        GRAPHIQL: true,
        DB: {
            URI: 'mongodb://localhost:27017/shortlinks'
        },
        SESSION: {
            LIFE: 36000000
        }
    },
    production: {
        PORT: 443,
        GRAPHIQL: false,
        DB: {
            URI: ''
        },
        SESSION: {
            LIFE: 36000000
        }
    }
}[process.env.NODE_ENV || 'development'];

/* Set session key for all environments */
config.SESSION.KEY = crypto.randomBytes(256).toString('hex');

module.exports = config;
