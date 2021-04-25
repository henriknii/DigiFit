const express = require('express');
const router = express.Router()

//Getting all users
router.get('/',(req,res) =>{
    res.send("hello world")
})

//Get a specific user
router.get('/:id',(req,res) =>{
    
})

//Creating user
router.post('/',(req,res) =>{
    
})

// Updating a user
router.patch('/:id',(req,res) =>{
    
})

//Delete a user
router.delete('/:id',(req,res) =>{
    
})

module.exports = router;