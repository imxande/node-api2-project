// import express like react
const express = require('express')

// import data
const data = require('../data/db.js')

// need this to import router to use the goodies 
// that come with it, this is so we can use router + endpoint
const router = express.Router();

// checking if when a get request is made
router.get('/', (req, res) =>{
    res.send('My life for Aiur')
})

// creates post using info sent inside the request  body
router.post('/', (req, res) =>{
    // if body is missing title or contents property cancel the request
     if (!req.body.title || req.body.contents ){
         res.status(400).json({ errorMessage: "Please provide title and contents for the post."})
     }

     // if data is valid then save the new post to the database 
     const {title, contents} = req.body
     data.insert(req.body)
     .then(res =>{
        res.status(201).json(res);
     })
     .catch(error =>{
         console.log(error)
        res.status(500).json({ error: "There was an error while saving the post to the database" })
     })

})

// Creates a comment for the post with the specified id using information sent inside of the request body.
router.post('/api/posts/:id/comments', (req, res) =>{

})

// Returns an array of all the post objects contained in the database.
router.get('/', (req, res) =>{

})

// Returns the post object with the specified id.
router.get('/:id', (req, res) =>{

})

// Returns an array of all the comment objects associated with the post with the specified id.
router.get(':id/comments')

// export router
module.exports = router;