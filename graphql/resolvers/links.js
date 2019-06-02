const shortid = require('shortid');

const Link = require('../../models/link');

module.exports = {
    links: async (_, req) => {
        if (!req.isAuth) {
            throw new Error('Unauthenticated!');
        }
        try {
            const links = await Link.find();
            return links.map(link => {
                return { ...link._doc };
            });
        } catch(err) {
            throw err;
        }
    },
    createLink: async ({ linkInput }, req) => {
        if (!req.isAuth) {
            throw new Error('Unauthenticated!');
        }
        try {
            /* Create a new Link and save to DB */
            const link = new Link ({
                name: linkInput.name,
                url: linkInput.url,
                short: shortid.generate(),
                creator: req.userId
            });
            const result = await link.save();
            /* Return created Link */
            return { ...result._doc };
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
            const event = await Link.findById(linkId);
            await Link.deleteOne({ _id: linkId });
            return event;
        } catch(err) {
            throw err;
        }
    }
};
