const shortid = require('shortid');
const { UserInputError } = require('apollo-server');

const Link = require('../../models/Link');
const { TOKEN } = require('../../config');
const { checkAuthToken } = require('../../utils/auth-token');
const {
    validateCreateLinkInput,
    validateEditLinkInput,
    validateDeleteLinkInput
} = require('../../utils/validators');

module.exports = {
    Query: {
        async getLinks(_, {}, context) {
            // Check and obtain user ID from auth token
            const { sub: userId } = checkAuthToken(TOKEN.KEY, context.req);
            try {
                return await Link.find({ createdBy: userId });
            } catch(err) {
                throw new Error(err);
            }
        },
        async getPublicLinks(_, {}) {
            try {
                // Return subset of Link (URLs and active flag)
                return Link.find({
                    active: true
                }, {
                    '_id': 0, 'shortURL': 1, 'longURL': 1
                });
            } catch(err) {
                throw new Error(err);
            }
        }
    },
    Mutations: {
        async createLink(_, { input: { url, name } }, context) {
            // Check and obtain user ID from auth token
            const { sub: userId } = checkAuthToken(TOKEN.KEY, context.req);
            // Validate input data
            const { valid, errors } = validateCreateLinkInput(url, name);
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
        async editLink(_, { input: { _id, url, name, active } }, context) {
            // Check and obtain user ID from auth token
            const { sub: userId } = checkAuthToken(TOKEN.KEY, context.req);
            // Validate input data
            const { valid, errors } = validateEditLinkInput(_id, url, name);
            if (!valid) {
                throw new UserInputError('Errors', { errors });
            }
            try {
                // Obtain user owned Link from DB
                const link = await Link.findOne({ _id, createdBy: userId });
                if (!link) {
                    throw new UserInputError('Link not found');
                }
                // Update fields if they exist in input
                link.name = name !== undefined ? name : link.name;
                link.longURL = url !== undefined ? url : link.longURL;
                link.active = active !== undefined ? active : link.active;
                // Save and return Link from DB
                return await link.save();
            } catch(err) {
                throw new Error(err);
            }
        },
        async deleteLink(_, { input: { _id } }, context) {
            // Check and obtain user ID from auth token
            const { sub: userId } = checkAuthToken(TOKEN.KEY, context.req);
            // Validate input data
            const { valid, errors } = validateDeleteLinkInput(_id);
            if (!valid) {
                throw new UserInputError('Errors', { errors });
            }
            try {
                // Obtain user owned Link from DB
                const link = await Link.findOne({
                    _id,
                    createdBy: userId
                });
                if (!link) {
                    throw new UserInputError('Link not found');
                }
                // Delete Link from DB and return it
                await Link.deleteOne({
                    _id,
                    createdBy: userId
                });
                return link;
            } catch(err) {
                throw new Error(err);
            }
        }
    }
};
