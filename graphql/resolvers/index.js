const userResolver = require('./users');
const linkResolver = require('./links');

const rootResolver = {
    ...userResolver,
    ...linkResolver
};

module.exports = rootResolver;
