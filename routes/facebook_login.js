const express= require('express');
const router= express.Router();
const {Fb_Register}= require('../models/facebook_register');
const fetch= require('node-fetch');

router.post('/',async(req, res)=>{

    const result= await fetch(`https://graph.facebook.com/v6.0/me?access_token=${req.body.accessToken}&method=get&pretty=0&sdk=joey&suppress_http_code=1`)
    const json= await result.json();

    if(json.id!=req.body.userID)
        return res.status(400).send({responseText:"Don't try to f with us"});

    const register=await Fb_Register.findOne({facebookID: req.body.userID});

    if(register)
        return res.status(200).send({link:"/dashboard/2-"+json.id,message: 'You are logged in'});

    const fb_register= new Fb_Register({
        name: req.body.name,
        facebookID: req.body.userID,
        accessToken: req.body.accessToken
    })

    await fb_register.save();

    return res.status(200).send({link:"/dashboard/2-"+json.id, message:'You are registered and logged in'});
});

module.exports= router;

