const fs = require('fs');
const http = require('http');
const https = require('https');
const express = require('express');
const mongoose = require('mongoose');
const { ApolloServer } = require('apollo-server-express');

const typeDefs = require('./graphql/typedefs');
const resolvers = require('./graphql/resolvers');
const { SSL, PORT, MONGODB } = require('./config');

const apollo = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req })
});

const app = express();
apollo.applyMiddleware({ app });

const server = SSL ? https.createServer({
    key: fs.readFileSync(SSL.KEY), crt: fs.readFileSync(SSL.CRT)
}, app) : http.createServer(app);

mongoose.connect(MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Database connected');
    return server.listen({ port: PORT });
}).then(() => {
    console.log(
        'Server running at',
        `http${SSL ? 's' : ''}://localhost:${PORT}${apollo.graphqlPath}`
    );
});
