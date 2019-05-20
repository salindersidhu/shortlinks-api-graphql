const { buildSchema } = require('graphql');

module.exports = buildSchema(`
type Link {
    _id: ID!
    name: String!
    url: String!
}

input LinkInput {
    name: String!
    url: String!
}

type RootQuery {
    links: [Link!]!
}

type RootMutation {
    createLink(linkInput: LinkInput): Link
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`);
