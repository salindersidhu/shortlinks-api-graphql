const { gql } = require('apollo-server');

const userTypeDefs = require('./users');
const linkTypeDefs = require('./links');

const typeDefs = [
    userTypeDefs,
    linkTypeDefs
];

const props = {
    'types': [],
    'inputs': [],
    'queries': [],
    'mutations': []
};

typeDefs.forEach(typDef => {
    Object.keys(props).forEach(prop => {
        props[prop].push(typDef[prop] || '');
    });
});

module.exports = gql`
    ${props.types.join('\n')}
    ${props.inputs.join('\n')}
    type Query {
        ${props.queries.join('\n')}
    }
    type Mutation {
        ${props.mutations.join('\n')}
    }
`;
