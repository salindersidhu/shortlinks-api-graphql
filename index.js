const mongoose = require('mongoose');
const { ApolloServer } = require('apollo-server');

const { MONGODB, PORT } = require('./config');
const typeDefs = require('./graphql/typedefs');
const resolvers = require('./graphql/resolvers');

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req })
});

mongoose.connect(MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Database connected');
    return server.listen({ port: PORT });
}).then(res => {
    console.log(`Server running at ${res.url}`);
});
