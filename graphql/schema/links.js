exports.types = `
    type Link {
        _id: ID!
        name: String!
        url: String!
        short: String!
        creator: User!
    }
`;

exports.inputs = `
    input LinkInput {
        name: String!
        url: String!
    }
`;

exports.queries = `
    links: [Link!]!
`;

exports.mutations = `
    createLink(linkInput: LinkInput): Link
    deleteLink(linkId: ID!): Link!
`;
