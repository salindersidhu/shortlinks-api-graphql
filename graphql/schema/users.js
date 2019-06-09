exports.types = `
    type User {
        _id: ID!
        name: String!
        email: String!
        password: String
        createdLinks: [Link!]
    }

    type AuthData {
        token: String!
    }
`;

exports.inputs = `
    input UserInput {
        name: String!
        email: String!
        password: String!
    }

    input LoginInput {
        email: String!
        password: String!
    }
`;

exports.queries = `
    """
    Fetches User authenticated data upon login.
    """
    login(input: LoginInput): AuthData!
`;

exports.mutations = `
    """
    Create a new Link.
    """
    createUser(input: UserInput): User
`;
