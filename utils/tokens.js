const url = require("url");
const njwt = require("njwt");

module.exports = {
  createToken: (payload, key, life, req) => {
    // Create a JWT for authentication
    const token = njwt.create(
      {
        ...payload,
        iss: url.format({
          protocol: req.protocol,
          host: req.get("host"),
          pathname: ""
        })
      },
      key
    );
    // Set token expiration date
    token.setExpiration(new Date().getTime() + life);
    // Return JWT as a compact token
    return token.compact();
  },
  checkToken: (key, req) => {
    // Check if request header contains 'Authorization'
    const authHeader = req.get("Authorization");
    if (authHeader) {
      const token = authHeader.split("Bearer ")[1];
      if (token) {
        try {
          // Verifty and decode the token
          const decodedToken = njwt.verify(token, key);
          // Return body as payload
          return decodedToken.body;
        } catch (err) {
          throw new Error("Invalid or Expired token");
        }
      }
      throw new Error('Authentication token must be "Bearer [token]"');
    }
    throw new Error("Authorization header must be provided");
  }
};
