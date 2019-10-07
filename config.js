const crypto = require('crypto');

const config = {
    development: {
        PORT: 8000,
        MONGODB: 'mongodb://localhost:27017/shortlinks',
        TOKEN: {
            LIFE: 3600000,
            KEY: '7ED57FEA236E486B3255715263213'
        }
    },
    production: {
        PORT: 443,
        MONGODB: '',
        TOKEN: {
            LIFE: 36000000,
            KEY: crypto.randomBytes(256).toString('hex')
        }
    }
}[process.env.NODE_ENV || 'development'];

module.exports = config;
