
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
    },

     updateItem(parent, args, ctx, info){
        // first take a copy of the updates.
        const updates = { ...args };
        // remove the id from the update because we or no one must not update the id.
        delete updates.id;
        // run the update method.
        // update will first is data-> what data to update.
        // second is where -> in our case we will return id.
        // if you want to check what update will take the arguments we can always check it in prisma.graphql.
        return ctx.db.mutation.updateItem(
                {
                    data: updates,
                    where: {
                        id: args.id,
                    }
                }, info)
     },

     async deleteItem(parent, args, ctx, info){
        const where = {id: args.id };
         //1. find the item.
         const item = await ctx.db.query.item({where}, `{id title}`);
         //2. check if they own the item or have the permissions.
         // TODO:
         //3. delete it.
         return ctx.db.mutation.deleteItem({where}, info)
     }
};

module.exports = Mutations;
