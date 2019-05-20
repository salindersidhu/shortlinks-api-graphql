const Link = require('../../models/link');

module.exports = {
    links: () => {
        return Link.find().then(links => {
            return links.map(link => {
                return {...link._doc};
            });
        }).catch(err => {
            throw err;
        });
    },
    createLink: (args) => {
        const link = new Link({
            name: args.linkInput.name,
            url: args.linkInput.url
        });
        return link.save().then(result => {
            return {...result._doc};
        }).catch(err => {
            console.log(err);
            throw err;
        });
    }
};
