const { buildSchema } = require('graphql');

const userSchema = require('./users');
const linkSchema = require('./links');

const schemas = [
    userSchema,
    linkSchema
];
const props = {
    'types': [],
    'inputs': [],
    'queries': [],
    'mutations': []
};

schemas.map(schema => {
    Object.keys(props).map(prop => {
        props[prop].push(schema[prop] || '');
    });
});

const rootSchema = buildSchema(`
    ${props.types.join('\n')}
    ${props.inputs.join('\n')}
    """
    The GraphQL root query.
    """
    type Query {
        ${props.queries.join('\n')}
    }
    """
    The GraphQL root mutations.
    """
    type Mutation {
        ${props.mutations.join('\n')}
    }
    schema {
        query: Query
        mutation: Mutation
    }
`);

module.exports = rootSchema;
