const shortid = require('shortid');

const Link = require('../../models/link');
const User = require('../../models/user');
const { transformLink } = require('./merge');

module.exports = {
    links: async (_, req) => {
        if (!req.isAuth) {
            throw new Error('Unauthenticated!');
        }
        try {
            const links = await Link.find();
            return links.map(link => {
                return transformLink(link);
            });
        } catch(err) {
            throw err;
        }
    },
    createLink: async ({ linkInput }, req) => {
        if (!req.isAuth) {
            throw new Error('Unauthenticated!');
        }
        /* Create a new Link */
        const link = new Link ({
            name: linkInput.name,
            url: linkInput.url,
            short: shortid.generate(),
            creator: req.userId
        });
        try {
            /* Save link to DB and find creator */
            const result = await link.save();
            const creator = await User.findById(req.userId);
            if(!creator) {
                throw new Error('User not found!');
            }
            creator.createdLinks.push(link);
            await creator.save();
            /* Return link with user object */
            return transformLink(result);
        } catch(err) {
            throw err;
        }
    },
    deleteLink: async ({ linkId }, req) => {
        if (!req.isAuth) {
            throw new Error('Unauthenticated!');
        }
        try {
            /* Find and delete link from DB */
            const link = await Link.findById(linkId);
            await Link.deleteOne({ _id: linkId });
            return transformLink(link);
        } catch(err) {
            throw err;
        }
    }
};
