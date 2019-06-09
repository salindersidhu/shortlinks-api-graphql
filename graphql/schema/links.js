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
    """
    Lookup all Links.
    """
    links: [Link!]!
`;

exports.mutations = `
    """
    Create a new Link.
    """
    createLink(input: LinkInput): Link
    """
    Delete an existing Link given it's ID.
    """
    deleteLink(id: ID!): Link!
`;
