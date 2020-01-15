// import express
const express = require('express');

// route variable
const postRouter = require('../router/router.js')

// create a server with express
const server = express();

// teach express how to use json
server.use(express.json());

// handle requests to the root of the api, the / route
// server.get('/', (req, res) =>{
//     res.send("Hello from express")
// })

// request to routes that begin with api/posts
server.use('/api/posts', postRouter);


// export server
module.exports = server;




