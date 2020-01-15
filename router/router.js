// import express like react
const express = require('express');

// import data
const DataBase = require('../data/db.js')

// need this to import router to use the goodies 
// that come with it, this is so we can use router + endpoint
const router = express.Router();

// checking if response is send once a get request is made
// router.get('/', (req, res) =>{
//     res.send('My life for Aiur')
// })

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

// Returns the post object with the specified id. 
router.get('/:id', (req, res) => {
    DataBase.findById(req.params.id)
    .then(response => {
        if(response.length === 0){
            res.status(404).json({message: 'Post not found'})
        }else{
            res.status(200).json(response);
        }
    })
    .catch(err => {
        res.status(500).json({message: 'Error finding post'})
    })
}) 

//  Returns an array of all the comment objects associated with the post with the specified id.                          
router.get('/:id/comments', (req, res) => {
    DataBase.findCommentById(req.params.id)
    .then(response => {
        console.log(hub)
        if(response.length === 0){
            res.status(404).json({message: 'Post not found'})
        }else{
            res.status(200).json(response)
        }
    })
    .catch(err => {
        res.status(500).json({message: 'Error finding comment'})
    })
})

//  Removes the post with the specified id and returns the **deleted post object**. You may need to make additional calls to the database in order to satisfy this requirement.
router.delete('/:id', (req, res) => {
    DataBase.remove(req.params.id)
    .then(response => {
        console.log(response)
        if(response === 0){
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }else{
            res.status(200).json({message: 'Post deleted'})
        }
    })
    .catch(err=> {
        res.status(500).json({ error: "The post could not be removed" })
    })
})

// Updates the post with the specified `id` using data from the `request body`. Returns the modified document, **NOT the original**.                                    
router.put('/:id', (req, res) => {
    DataBase.update(req.params.id, req.body)
    .then(response => {
        if(response.length === 0){
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }else if(req.body.title === ''){
            res.status(400).json({ errorMessage: "Please provide title for the post." })
        }else if(req.body.contents === ''){
            res.status(400).json({ errorMessage: "Please provide contents for the post." })            
        }else{
            res.status(200).json(response)
        }
    })
    .catch(err => {
        res.status(500).json({ error: "The post information could not be modified." })
    })
})

module.exports = router;
