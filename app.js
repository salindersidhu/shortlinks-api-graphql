const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');

const config = require('./config');

const graphqlSchema = require('./graphql/schema');
const graphqlResolvers = require('./graphql/resolvers');

/* Configure Express app and middleware */
const app = express();
app.use(bodyParser.json());

/* Configure GraphQL endpoint */
app.use(
    '/graphql',
    graphqlHttp({
        schema: graphqlSchema,
        rootValue: graphqlResolvers,
        graphiql: config.GRAPHIQL
    })
);

/* Configure Database connection */
mongoose.connect(config.DB.URI, {
    useNewUrlParser: true
}).then(() => {
    /* Start server */
    app.listen(config.PORT, () => {
        console.log(`Listening on port ${config.PORT}`);
    });
}).catch(err => {
    console.log(err);
});
