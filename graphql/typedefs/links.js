module.exports = {
    types: `
        """
        Link.
        """
        type Link {
            """
            Object ID of Link.
            """
            _id: String
            """
            Link name.
            """
            name: String
            """
            Original Link URL.
            """
            longURL: String!
            """
            Short UUID representing the Link.
            """
            shortURL: String!
            """
            Determines if the link is active or disabled.
            """
            active: Boolean
            """
            User who created the Link.
            """
            createdBy: ID
            """
            Created at timestamp.
            """
            createdAt: String
            """
            Last modified at timestamp.
            """
            updatedAt: String
        }
    `,
    inputs: `
        """
        New Link input.
        """
        input CreateLinkInput {
            """
            Link URL.
            """
            url: String!
            """
            Link name.
            """
            name: String!
        }
        """
        Edit Link input.
        """
        input EditLinkInput {
            """
            Object ID of an existing Link.
            """
            _id: String!
            """
            Link URL.
            """
            url: String
            """
            Link name.
            """
            name: String
            """
            Determines if the link is active or disabled.
            """
            active: Boolean
        }
        """
        Delete Link input.
        """
        input DeleteLinkInput {
            """
            Object ID of an existing Link.
            """
            _id: String!
        }
    `,
    queries: `
        """
        Fetch all links that are active.
        
        [Only returns longURL and shortURL]
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
        Create a new Link.

        [Requires Authentication]
        """
        createLink(input: CreateLinkInput): Link!
        """
        Edit an existing Link.

        [Requires Authentication]
        """
        editLink(input: EditLinkInput): Link!
        """
        Delete an existing Link.

        [Requires Authentication]
        """
        deleteLink(input: DeleteLinkInput): Link!
    `
};
