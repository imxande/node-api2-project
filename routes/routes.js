// import express like react
const express = require('express')

// import data
const Blogs = require('../data/db.js')

// need this to import router to use the goodies 
// that come with it, this is so we can use router + endpoint
const router = express.Router();

// Router
router.get('/', (req, res) =>{
    res.send('My life for Aiur')
})

// export router
module.exports = router;