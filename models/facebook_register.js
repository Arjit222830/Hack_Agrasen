const mongoose =require('mongoose');

const Fb_Register= mongoose.model('fb_registers', new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    facebookID: {
        type: String,
        required: true
    },
    accessToken: {
        type: String,
        required: true
    },
})
);

module.exports.Fb_Register= Fb_Register;