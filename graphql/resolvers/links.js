const shortid = require('shortid');
const { UserInputError, AuthenticationError } = require('apollo-server');

const Link = require('../../models/Link');
const { TOKEN } = require('../../config');
const { checkAuthToken  } = require('../../utils/auth-token');
const { validateLinkInput } = require('../../utils/validators');

module.exports = {
    Query: {
        async getLinks(_, {}, context) {
            // Check if user is authenticated
            checkAuthToken(TOKEN.KEY, context.req);
            try {
                return await Link.find();
            } catch(err) {
                throw new Error(err);
            }
        },
        async getLink(_, { linkId }, context) {
            // Check if user is authenticated
            checkAuthToken(TOKEN.KEY, context.req);
            try {
                const link = await Link.findById(linkId);
                if (link) {
                    return link;
                } else {
                    throw new UserInputError('Link not found');
                }
            } catch(err) {
                throw new Error(err);
            }
        }
    },
    Mutations: {
        async createLink(_, { linkInput: { url, name } }, context) {
            // Check and obtain user ID from auth token
            const userId = checkAuthToken(TOKEN.KEY, context.req).sub;
            // Validate input data
            const { valid, errors } = validateLinkInput(url, name);
            if (!valid) {
                throw new UserInputError('Errors', { errors });
            }
            // Create a new Link
            const newLink = new Link({
                name,
                longURL: url,
                shortURL: shortid.generate(),
                createdBy: userId
            });
            // Save and return Link to DB
            return await newLink.save();
        },
        async editLink(_, { linkInput: { _id, url, name } }, context) {
            // Check and obtain user ID from auth token
            const userId = checkAuthToken(TOKEN.KEY, context.req).sub;
            // Validate input data
            const { valid, errors } = validateLinkInput(url, name);
            if (!valid) {
                throw new UserInputError('Errors', { errors });
            }
            try {
                // Obtain Link from DB
                const link = await Link.findById(_id);
                if (!link) {
                    throw new UserInputError('Link not found');
                }
                // Check if auth user is the creator of the Link
                if (link.createdBy.equals(userId)) {
                    // Update, save and return Link from DB
                    link.name = name;
                    link.longURL = url;
                    return await link.save();
                } else {
                    throw new AuthenticationError('Action not allowed');
                }
            } catch(err) {
                throw new Error(err);
            }
        },
        async deleteLink(_, { linkId }, context) {
            // Check and obtain user ID from auth token
            const userId = checkAuthToken(TOKEN.KEY, context.req).sub;
            try {
                // Obtain Link from DB
                const link = await Link.findById(linkId);
                if (!link) {
                    throw new UserInputError('Link not found');
                }
                // Check if auth user is the creator of the Link
                if (link.createdBy.equals(userId)) {
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
