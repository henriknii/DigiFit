const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const bcrypt = require('bcrypt');
const authenticate = require('../Middleware/auth')

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
router.get('/me',authenticate,async  (req,res) =>{

})

//Creating user
router.post('/register', async (req,res) =>{
    let user = new User(req.body);
    try{
        // Running the validate function on the userSchema
        let validUser = user.joiValidate(user);
        
        // Keeping track of the error from validation
        let error = validUser?.error?.details[0];

        //If error exists return the error
        if( error ){

              res.status(403).json({message: error.message})
        }

        else {
            //else save the user to the database
                const salt = await bcrypt.genSalt();
                //hashing password
                hashedPassword = await bcrypt.hash(req.body.password,salt);
                user.password = hashedPassword;
            
            
            const newUser = await user.save()
            res.status(201).json(newUser);
        }
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Updating a user
router.patch('/:email',getUser, async (req,res) =>{
   if(req.body.name !== null){ res.user.name = req.body.name}
   if(req.body.age !== null){ res.user.age = req.body.age}
   if(req.body.height !== null){ res.user.height = req.body.height}
   if(req.body.weight !== null){ res.user.weight = req.body.weight}
   if(req.body.email !== null){ res.user.email = req.body.email}
   if(req.body.password !== null){ res.user.password = req.body.password}

   try{
       const updatedUser = await res.user.save();
       res.json({message: "Update was succsessfull"});
   }

   catch ( err ){
       res.status(400).json({message : err.message});
   }
   
})

//Delete a user
router.delete('/:email',getUser , async (req, res) =>{
  
    try{
        await res.user.deleteOne()

        res.json({message: "User has been succesfully deleted"})
    }
    catch ( err ){
        res.status(500).json({message: err.message});
    }
})
    
// Getting user.
async function getUser(req, res, next){
    let user;
    try{
        user = await User.findOne({ email:req.params.email });
        if( user == null ){
            return res.status(404).json({message: 'Cannot find user'})
        }
    }
    catch ( err ){
        return res.status(500).json({message: error.message});
    }
    res.user = user
    next();
}

module.exports = router;