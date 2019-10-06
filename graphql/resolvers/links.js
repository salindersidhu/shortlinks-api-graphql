const shortid = require('shortid');
const { UserInputError, AuthenticationError } = require('apollo-server');

const Link = require('../../models/Link');
const checkAuth = require('../../utils/check-auth');

module.exports = {
    Query: {
        async getLinks(_, {}, context) {
            // Check if user is authenticated
            checkAuth(context);
            try {
                const links = await Link.find();
                return links;
            } catch(err) {
                throw new Error(err);
            }
        }
    },
    Mutations: {
        async createLink(_, { linkInput: { url, name } }, context) {
            // Obtain user ID from auth token
            const authData = checkAuth(context);
            // Create a new Link
            const newLink = new Link({
                name,
                longURL: url,
                shortURL: shortid.generate(),
                createdBy: authData.body.sub
            });
            // Save Link to DB and return it
            const link = await newLink.save();
            return link;
        },
        async deleteLink(_, { linkId }, context) {
            // Obtain user ID from auth token
            const authData = checkAuth(context);
            try {
                // Obtain Link from DB
                const link = await Link.findById(linkId);
                if (!link) {
                    throw new UserInputError('Link does not exist');
                }
                // Check if auth user is the creator of the Link
                if (link.createdBy.equals(authData.body.sub)) {
                    // Delete Link from DB and return it
                    await Link.deleteOne({ _id: linkId });
                    return link;
                } else {
                    throw new AuthenticationError('Action not allowed');
                }
            } catch(err) {
                throw new Error(err);
            }
        }
    }
};
