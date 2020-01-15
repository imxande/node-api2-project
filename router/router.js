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

// Creates a comment for the post with the specified id using information sent inside of the `request body`.  
router.post('/:id/comments', (req, res) =>{
    DataBase.insertComment(req.body)
        .then(response =>{
            if(response.length === 0){
                // if id not found return a 404(Not Found)
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            }
            // in case text is missing do a 400 (Bad Request)
            else if(!req.body.text){
                res.status(400).json(`{ errorMessage: "Please provide text for the comment." }`)
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

//Returns an array of all the post objects contained in the database.
router.get('/', (req,rest) => {
    DataBase.find()
    .then(response => {
        res.status(200).json(response);
    })
    .catch(err => {
        res.status(500).json({message: 'Error retrieving posts'})
    })
})





module.exports = router;
