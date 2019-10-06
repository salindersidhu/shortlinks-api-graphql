module.exports = {
    types: `
        type Link {
            _id: String!
            name: String!
            longURL: String!
            shortURL: String!
            createdBy: ID!
        }
    `,
    inputs: `
        input LinkInput {
            _id: String
            url: String!
            name: String!
        }
    `,
    queries: `
        getLinks: [Link!]
    `,
    mutations: `
        deleteLink(linkId: ID!): Link!
        editLink(linkInput: LinkInput): Link!
        createLink(linkInput: LinkInput): Link!
    `
};
