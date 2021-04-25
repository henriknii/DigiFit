const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const Double = require('@mongoosejs/double');

const userSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,

    },
    weight:{
        type: Double,
        required: true,
    },
    height:{
        type: Number,
        required: true,
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true,
    }

})



userSchema.pre('save',async function(next){

    user = this;
    
    //Checks if the password is new or has been modified.
    if( !user.isModified('password')) return next();

    //Generating salt then 
    bcrypt.genSalt(function( err,salt ){
        //Returning error if generating salt failed.
        if( err ) return next( err );

        //Hashing the password if generating the salt succeeded.
        bcrypt.hash(user.password,salt,function( err,hashedPassword ) {
            //Returning the error if the hashing fais.
            if( err ) return next( err )
            
            //Replaces the cleartext password with the hashed one
            user.password = hashedPassword;
        })

    })

})

module.exports = mongoose.model('User',userSchema);