const userResolver = require('./users');
const linkResolver = require('./links');

module.exports = {
    Query: {
        ...linkResolver.Query
    },
    Mutation: {
        ...userResolver.Mutation,
        ...linkResolver.Mutations
    }
};
