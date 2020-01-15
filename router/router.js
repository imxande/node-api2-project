// import express like react
const express = require('express');

// import data
const DataBase = require('../data/db.js')

// need this to import router to use the goodies 
// that come with it, this is so we can use router + endpoint
const router = express.Router();

// checking if response is send once a get request is made
router.get('/', (req, res) =>{
    res.send('My life for Aiur')
})

// Creates a post using the information sent inside the request body.
router.post('/', (req, res)=>{
    DataBase.insert(req.body)
        .then(response =>{
            if(!req.body.title && !req.body.contents){
                res.status(400).json(`{ errorMessage: "Please provide title and contents for the post." }`)
            }
            else{
                res.status(201).json(response)
            }
        })
        .catch(error =>{
            console.log(error)
            res.status(500).json(`{ error: "There was an error while saving the post to the database" }`)
        })
})



module.exports = router;
