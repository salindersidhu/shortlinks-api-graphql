exports.types = `
    type User {
        _id: ID!
        name: String!
        email: String!
        password: String!
    }
`;

exports.inputs = `
    input UserInput {
        name: String!
        email: String!
        password: String!
    }
`;

exports.queries = `
    users: [User!]!
`;

exports.mutations = `
    createUser(userInput: UserInput): User
`;
