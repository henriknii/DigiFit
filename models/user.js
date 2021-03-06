const mongoose = require('mongoose');
const bcrypt = require('bcrypt');



const userSchema = new mongoose.Schema({
    name : {
        type: String,
    },
    age: {
        type: Number,

    },
    weight:{
        type: Number,
    },
    height:{
        type: Number,
    },
    email:{
        type: String,
        unique: true,
    },
    password:{
        type: String,
    },

    created: {
        type: Date,
        default: Date.now
    }

})

// validation scheme for registering a user
userSchema.methods.joiValidate =  function(obj) {

    const Joi = require('joi')
    

    const schema = Joi.object({
        _id : Joi.object(),
        name : Joi.string()
               .max(60)
               .required()
               .messages({
                   'string.base': `"name" should be a type of 'text'`,
                   'string.empty': `"name" cannot be empty`,
                   'string.max': `"name" cannot be longer than {#limit} characters`
               }),
        weight : Joi.number()
                 .required()
                 .max(999)
                 .messages({
                     'number.base': `"weight should be a type of "number"`,
                     'number.max': `This application does not support weights above {#limit}`,
                     'number.empty': `"weight" cannot be empty`
                 }),
        height : Joi.number()
                .required()
                .max(350)
                .messages({
                    'number.base': `"height should be a type of "number"`,
                    'number.max': `This application does not support heights above {#limit}`,
                    'number.empty': `"Height" cannot be empty`
                }),
        age : Joi.number()
             .required()
             .max(120)
             .messages({
                'number.base': `"age should be a type of "number"`,
                'number.max': `This application does not support an age above {#limit}`,
                'number.empty': `"age" cannot be empty`
            }),
        //Only IANIA registered emails allowed, and the email must have two segments
        email : Joi.string().email({minDomainSegments : 2, tlds:{allow : true}}).max(60),
        //Regexp that require minimum eight characters, at least one uppercase letter, one lowecase letter and one number
        password: Joi.string()
                  .pattern(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]/))
                  .required()
                  .max(20)
                  .min(8)
                  .messages({
                    'string.empty': `Please provide a password`,
                    'string.max': `Password cannot be longer than {#limit} characters`,
                    'string.min': `Password cannot be shorter than {#limit} characters`,
                    'string.pattern.base':`Please make sure that the password contains atleast 8 characters, one uppercase and one lowecase letter and one number`,
                }),
        created: Joi.date()
    })

      return schema.validate(obj._doc)
}

// Encrypts password before saving user to database

//password validation
userSchema.methods.validatePassword = async function (obj){
    user = this;
    console.log(user.password);
    try {
        if(await bcrypt.compare(obj.password, user.password)){
            return true
        }
        return false;
    }
    catch{
        return "Something went wrong"
    }

    
}

module.exports = mongoose.model('User',userSchema);