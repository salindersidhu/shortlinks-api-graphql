const DataLoader = require('dataloader');

const User = require('../../models/user');
const Link = require('../../models/link');

const linkLoader = new DataLoader(linkIds => {
    return links(linkIds);
});

const userLoader = new DataLoader(userIds => {
    return User.find({ _id: { $in: userIds } });
});

const links = async linkIds => {
    try {
        const links = await Link.find({ _id: { $in: linkIds } });
        links.sort((a, b) => {
            return (
                linkIds.indexOf(a._id.toString()) - linkIds.indexOf(b._id.toString())
            );
        });
        return links.map(link => {
            return transformLink(link);
        });
    } catch(err) {
        throw err;
    }
};

const user = async userId => {
    try {
        const user = await userLoader.load(userId.toString());
        return {
            ...user._doc,
            createdLinks: () => linkLoader.loadMany(user._doc.createdLinks)
        };
    } catch(err) {
        throw err;
    }
};

const transformLink = link => {
    return {
        ...link._doc,
        creator: user.bind(this, link.creator)
    };
};

exports.transformLink = transformLink;
