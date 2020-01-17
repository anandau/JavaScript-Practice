// This File Connects to the remote prisma DB and gives us the ability to query with js.

const { Prisma } = require('prisma-binding');

// typeDefs -> what kind of data type do we have and it is in the prisma.graphql.
// endpoint -> where our prisma database live.
// secret -> our db password.
// debug -> this will console all the mutation query in our console if true.

const db = new Prisma({
   typeDefs: 'src/generated/prisma.graphql',
   endpoint: process.env.PRISMA_ENDPOINT,
   secret: process.env.PRISMA_SECRET,
   debug: false
});

module.exports = db;