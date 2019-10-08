module.exports = {
    types: `
        """
        Link.
        """
        type Link {
            """
            Object ID of Link.
            """
            _id: String!
            """
            Link name.
            """
            name: String!
            """
            Original Link URL.
            """
            longURL: String!
            """
            Short UUID representing the Link.
            """
            shortURL: String!
            """
            User who created the Link.
            """
            createdBy: ID!
        }
    `,
    inputs: `
        """
        Link input.
        """
        input LinkInput {
            """
            Object ID of Link.
            """
            _id: String
            """
            Link URL.
            """
            url: String!
            """
            Link name.
            """
            name: String!
        }
    `,
    queries: `
        """
        Fetch all Links.

        [Requires Authentication]
        """
        getLinks: [Link!]
        """
        Fetch an existing Link.

        [Requires Authentication]
        """
        getLink(
            """
            Object ID of an existing Link.
            """
            linkId: ID!
        ): Link!
    `,
    mutations: `
        """
        Delete an existing Link.

        [Requires Authentication]
        """
        deleteLink(
            """
            Object ID of an existing Link.
            """
            linkId: ID!
        ): Link!
        """
        Edit an existing Link.

        [Requires Authentication]
        """
        editLink(linkInput: LinkInput): Link!
        """
        Create a new Link.

        [Requires Authentication]
        """
        createLink(linkInput: LinkInput): Link!
    `
};
