const njwt = require('njwt');

const config = require('../config');

module.exports = (req, _, next) => {
    /* Check if request header contains 'Authorization' */
    const header = req.get('Authorization');
    if (!header) {
        req.isAuth = false;
        return next();
    }
    /* Verify token exists */
    const token = header.split(' ')[1];
    if (!token || token === '') {
        req.isAuth = false;
        return next();
    }
    /* Decode token */
    let decodedToken;
    try {
        decodedToken = njwt.verify(token, config.SESSION.KEY);
    } catch(err) {
        req.isAuth = false;
        return next();
    }
    /* Verify decoded token exists */
    if (!decodedToken) {
        req.isAuth = false;
        return false();
    }
    /* User is Authorized */
    req.isAuth = true;
    next();
};
