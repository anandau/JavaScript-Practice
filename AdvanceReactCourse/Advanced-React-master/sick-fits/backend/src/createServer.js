const {GraphQLServer} = require('graphql-yoga');
// what do resolvers do is it will allow us to do mutation if user wants to push data and query if user wants to get or fetch data.
const Mutation = require('./resolvers/Mutation');
const Query = require('./resolvers/Query')
const db = require('./db');

// create the GraphQL Yoga Server.

// for typeDefs we have to create a new file in src/schema.graphql.
// why ???
// because we are creating two graphQL servers
//1. we have our Prisma server which requires its own definition and schema.
//2. and we also have our GraphQL Server which needs its own schema and types as well.
function createServer() {
    return new GraphQLServer({
        typeDefs: 'src/schema.graphql',
        resolvers: {
            Mutation,
            Query
        },
        resolverValidationOptions: {
            requireResolversForResolveType: false
        },
        context: req => ({...req, db}),
    })
}

module.exports = createServer;