exports.types = `
    type Link {
        _id: ID!
        name: String!
        url: String!
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
`;
