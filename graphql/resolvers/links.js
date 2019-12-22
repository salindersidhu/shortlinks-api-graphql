const shorthash = require('shorthash');
const { UserInputError } = require('apollo-server');

const { TOKEN } = require('../../config');
const { Link, Stats } = require('../../models');
const { checkAuthToken } = require('../../utils/auth-token');
const {
    validateEditLinkInput,
    validateCreateLinkInput,
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
                    '_id': 0, 'hash': 1, 'url': 1
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
            // Check for an existing link created by this user
            const existingLink = await Link.findOne({ url, createdBy: userId });
            if (existingLink) {
                throw new UserInputError('Link with URL exists', {
                    errors: {
                        url: 'You previously created a Link using this URL'
                    }
                });
            }
            /**
             * Create a new link using shorthash as the short url. Use the
             * user ID with the url for the shorthash to ensure uniqueness.
             */
            const newLink = new Link({
                url,
                name,
                hash: shorthash.unique(userId + url),
                createdBy: userId
            });
            // Generate stats for the new Link
            await new Stats({
                link: newLink._id
            }).save();
            // Save and return Link to DB
            return await newLink.save();
        },
        async editLink(_, { input: { _id, name, active } }, context) {
            // Check and obtain user ID from auth token
            const { sub: userId } = checkAuthToken(TOKEN.KEY, context.req);
            // Validate input data
            const { valid, errors } = validateEditLinkInput(_id, name);
            if (!valid) {
                throw new UserInputError('Errors', { errors });
            }
            try {
                // Obtain and update user owned Link from DB
                await Link.updateOne({ _id, createdBy: userId }, { name, active });
                // Obtain and return updated Link from DB
                return await Link.findOne({ _id, createdBy: userId });
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
                // Delete Stats associated with the Link
                await Stats.deleteOne({
                    link: _id
                });
                return link;
            } catch(err) {
                throw new Error(err);
            }
        }
    }
};
