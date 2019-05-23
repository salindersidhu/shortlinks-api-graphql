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
    type RootQuery {
        ${props.queries.join('\n')}
    }
    type RootMutation {
        ${props.mutations.join('\n')}
    }
    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);

module.exports = rootSchema;
