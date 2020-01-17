
// parent =>
// args => arguments that have been passed to function.
// ctx => context -> in createServer.js we have given the access of db
// info => whole information around the graphQL query.
const Mutations = {
    async createItem(parent, args, ctx, info){
        // TODO check if they are logged in.

        // the db has been passed in createServer.js
        // go to schema.graphql and the type Mutation whatever api it has will be here for us like her createItem.
        // the args will have all the arguments.
        // the ctx.db.mutation.createItem will return a promise so that why we have to mark our fun as async
        const item = await ctx.db.mutation.createItem({
            data: {...args}
        }, info)

        return item;
    }
};

module.exports = Mutations;
