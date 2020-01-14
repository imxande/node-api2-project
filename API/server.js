// import express
const express = require('express');

// create a server with express
const server = express();

// route variable
const postRouter = require('../routes/routes.js')

// default post route (remember base url dummie)
server.use('/api/posts', postRouter);


// teach express how to use json
server.use(express.json());

// handle requests to the root of the api, the / route
server.get('/', (req, res) =>{
    res.send("Hello from express")
})

// export server
module.exports = server;




