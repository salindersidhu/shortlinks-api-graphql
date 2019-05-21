const { buildSchema } = require('graphql');

const rootSchema = buildSchema(`
    type User {
        _id: ID!
        name: String!
        email: String!
        password: String!
    }

    input UserInput {
        name: String!
        email: String!
        password: String!
    }

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
        users: [User!]!
        links: [Link!]!
    }

    type RootMutation {
        createUser(userInput: UserInput): User
        createLink(linkInput: LinkInput): Link
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);

module.exports = rootSchema;
