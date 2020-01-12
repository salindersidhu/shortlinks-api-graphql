const crypto = require("crypto");

const config = {
  development: {
    SSL: false,
    PORT: 8000,
    MONGODB: "", // mongodb://user:pass@host:27017/shortlinks?authSource=admin
    TOKEN: {
      LIFE: 36000000,
      KEY: "7ED57FEA236E486B3255715263213"
    }
  },
  production: {
    SSL: {
      KEY: "./.ssl/server.key",
      CRT: "./.ssl/server.crt"
    },
    PORT: 443,
    MONGODB: "",
    TOKEN: {
      LIFE: 36000000,
      KEY: crypto.randomBytes(256).toString("hex")
    }
  }
}[process.env.NODE_ENV || "development"];

module.exports = config;
