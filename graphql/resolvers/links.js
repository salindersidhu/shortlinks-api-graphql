const Link = require('../../models/link');

module.exports = {
    links: async () => {
        try {
            const links = await Link.find();
            return links.map(link => {
                return { ...link._doc };
            });
        } catch(err) {
            throw err;
        }
    },
    createLink: async ({ linkInput }) => {
        try {
            /* Create a new Link and save to DB */
            const link = new Link ({
                name: linkInput.name,
                url: linkInput.url
            });
            const result = await link.save();
            /* Return created Link */
            return { ...result._doc };
        } catch(err) {
            throw err;
        }
    }
};
