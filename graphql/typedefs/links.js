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
            Determines if the link is enabled or disabled.
            """
            active: Boolean
            """
            User who created the Link.
            """
            createdBy: ID!
            """
            Created at timestamp.
            """
            createdAt: String!
            """
            Last modified at timestamp.
            """
            updatedAt: String!
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
            url: String
            """
            Link name.
            """
            name: String
            """
            Determines if the link is enabled or disabled.
            """
            active: Boolean
        }
    `,
    queries: `
        """
        Fetch all active links (only returns URL strings).
        """
        getPublicLinks: [Link!]
        """
        Fetch all Links belonging to the authenticated user.

        [Requires Authentication]
        """
        getLinks: [Link!]
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
