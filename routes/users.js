const express = require('express');
const router = express.Router();
const User = require('../models/user.js');

//Getting all users
router.get('/', async (req,res) =>{
    try {
        const user = await User.find();
        res.json(user);
    }   
    catch (err){
        res.status(500).json( {message: err.message} );
    }
})

//Get a specific user
router.get('/:id',(req,res) =>{
    
})

//Creating user
router.post('/register', async (req,res) =>{
    const user = new User({

        name : req.body.name,
        age: req.body.age,
        height: req.body.height,
        weight: req.body.weight,
        email: req.body.email,
        password: req.body.password,

    })
    
    try{
        const newUser = await user.save()
        res.status(201).json(newUser);
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Updating a user
router.patch('/:id',(req,res) =>{
    
})

//Delete a user
router.delete('/:id',(req,res) =>{
    
})

module.exports = router;