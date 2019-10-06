const njwt = require('njwt');
const { AuthenticationError } = require('apollo-server');

const { SESSION } = require('../config');

module.exports = (context) => {
    // Check if request header contains 'Authorization'
    const authHeader = context.req.get('Authorization');
    if (authHeader) {
        const token = authHeader.split('Bearer ')[1];
        if(token) {
            try {
                const decodedToken = njwt.verify(token, SESSION.KEY);
                return decodedToken;
            } catch(err) {
                throw new AuthenticationError('Invalid/Expired token');
            }
        }
        throw new Error('Authentication token must be \"Bearer [token]\"');
    }
    throw new Error('Authorization header must be provided');
};
