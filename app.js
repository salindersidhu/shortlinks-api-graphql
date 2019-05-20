const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');

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
        graphiql: true
    })
);

/* Configure Database connection */
mongoose.connect(process.env.MONGO_DB_URI, {
    useNewUrlParser: true
}).then(() => {
    /* Start server */
    app.listen(process.env.PORT);
}).catch(err => {
    console.log(err);
});
