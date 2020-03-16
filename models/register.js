const Joi= require('joi');
const mongoose =require('mongoose');

const Register= mongoose.model('registrations', new mongoose.Schema({
        Email:{
            type: String,
            unique: true,
            required: true
        },
        Password: {
            type: String,
            required: true
        }
    })
);

function validateRegister(register){    
    const schema= {
        email: Joi.string().required().email(),
        password: Joi.string().required(),
    };
    return Joi.validate(register, schema);
}

module.exports.Register= Register;
module.exports.validateRegister=validateRegister;