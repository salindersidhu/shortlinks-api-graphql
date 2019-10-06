const { gql } = require('apollo-server');

module.exports = gql`
    type AuthData {
        token: String!
    }
    type Link {
        _id: String!
        name: String!
        longURL: String!
        shortURL: String!
        createdBy: ID!
    }
    input LoginInput {
        email: String!
        password: String!
    }
    input RegisterInput {
        email: String!
        username: String!
        password: String!
        confirmPassword: String!
    }
    input LinkInput {
        _id: String
        url: String!
        name: String!
    }
    type Query {
        getLinks: [Link!]
    }
    type Mutation {
        deleteLink(linkId: ID!): Link!
        editLink(linkInput: LinkInput): Link!
        createLink(linkInput: LinkInput): Link!
        login(loginInput: LoginInput): AuthData!
        register(registerInput: RegisterInput): AuthData!
    }
`;
