
const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const jwt = require('jsonwebtoken');
require('dotenv').config();

//login
router.post('/login', async ( req, res ) =>{
    const user = await User.findOne({email: req.body.email})
    if( user == null ){
        res.status(400).send("Cannot find user")
    }
    if(await user.validatePassword(req.body.password)){
        
        let validatedUser;

        ValidatedUser = {

            _id : user._id,
            name : user.name,
            email: user.email,
            height: user.height,
            weight: user.weight,
            age: user. age
            
        }
        
        const accessToken = jwt.sign({user:ValidatedUser},process.env.ACCESS_TOKEN_SECRET);
        res.send({accessToken:accessToken})
    }
  
});

//logout

module.exports = router;