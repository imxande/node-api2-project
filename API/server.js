// import express
const express = require('express');

// create a server with express
const server = express();

// i still need a route variable

// teach express how to use json
server.use(express.json());

// handle requests to the root of the api, the / route
server.get('/', (req, res) =>{
    res.send("Hello from express")
})

module.exports = server;




