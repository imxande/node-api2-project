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

// this works 1
// Creates a post using the information sent inside the request body.
router.post('/', (req, res)=>{

    // checking if we have title and contents
    if(!req.body.title || !req.body.contents){
      return  res.status(400).json(`{ errorMessage: "Please provide title and contents for the post." }`)
    }

    // if everything pass then we insert
    DataBase.insert(req.body)
        .then(response =>{
                // create was successful
                res.status(201).json(response)
                // {...req.body, id:response}
            
        })
        .catch(error =>{
            console.log(error)
            res.status(500).json(`{ error: "There was an error while saving the post to the database" }`)
        })
})

// this works 2
//Returns an array of all the post objects contained in the database.
router.get('/', (req,res) => {
    DataBase.find()
    .then(response => {
        res.status(200).json(response);
    })
    .catch(err => {
        res.status(500).json({message: 'Error retrieving posts'})
    })
})

//  this is working 3; remember to pass a post_id: and give it the same id on Postman
// Creates a comment for the post with the specified id using information sent inside of the `request body`.  
router.post('/:id/comments', (req, res) =>{

    // i need to add comments to the data base
    const comment = req.body;

    console.log(comment);
   
    DataBase.insertComment(comment)
        .then(response =>{
            res.status(201).json(response)
        })

        // in case of an error while saving the comment
        .catch(error =>{
            console.log(error)
            res.status(500).json(`{ error: "There was an error while saving the post to the database" }`)
        })  
})  

// this works without validaton, I need to provide validation
// Returns the post object with the specified id. 
router.get('/:id', (req, res) => {

   // finding the id
    DataBase.findById(req.params.id)
        
    .then(response => {
        if(response){
            res.status(200).json(response);
        }

        else{
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }

    })
    .catch(error => {
        res.status(500).json({message: 'Error finding post'})
    })
}) 

// not working
//  Returns an array of all the comment objects associated with the post with the specified id.                          
router.get('/:id/comments', (req, res) => {

    DataBase.findCommentById(req.params.id)
    .then(response => {
        console.log(response)
        if(response.length === 0){
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }else{
            res.status(200).json(response)
        }
    })
    .catch(err => {
        res.status(500).json({message: 'Error finding comment'})
    })
})

// this works
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

// this works
// Updates the post with the specified `id` using data from the `request body`. Returns the modified document, **NOT the original**.                                    
router.put('/:id', (req, res) => {

    // if title or contents are missing send a 400(Bad Request)
     if(!req.body.title || !req.body.contents){
        res.status(400).json({ errorMessage: "Please provide title or content for the post." })
    }
   
    DataBase.update(req.params.id, req.body)
    .then(response => {
        if(response){
            return res.status(200).json(req.body)
        }

        else{
            res.status(404).json({mesage:'Not updated'})
        }
           
    })
    .catch(err => {
        res.status(500).json({ error: "The post information could not be modified." })
    })
})

module.exports = router;
