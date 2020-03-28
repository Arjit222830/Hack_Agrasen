const express= require('express');
const router= express.Router();
const {Google_Register}= require('../models/google_register');

router.post('/',async(req, res)=>{

    const register=await Google_Register.findOne({googleID: req.body.userID});

    if(register)
        return res.status(400).send('Already Registered');

    const google_register= new Google_Register({
        name: req.body.name,
        googleID: req.body.userID,
        email: req.body.gmail
    })

    await google_register.save();

    return res.status(200).send({link:"/dashboard/3-"+req.body.userID, message:'You are registered and logged in'});
});

module.exports= router;

