// let's go!
// this is file where we start our node server.
// the first thing to make sure it we must all the variables which in variables.env.
require('dotenv').config({path: 'variables.env'});
const createServer = require('./createServer');
const db = require('./db');

const server = createServer();

// TODO Use express middleware to handle cookies (JWT)-> Json Web Tokens
// TODO Use express middleware to populate current user.

// cors -> we only want this endpoint to be able to be visited from our approved urls.
// origin -> here we are running our app on port 7777 so that means that only this front end can access it on our backend.
server.start({
    cors: {
        credentials: true,
        origin: process.env.FRONTEND_URL
    }
}, deets => console.log(`Server is running on port http:/localhost:${deets.port}`))