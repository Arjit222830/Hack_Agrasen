const express= require('express');
const router= express.Router();
const bcrypt= require('bcrypt');
const {Register, validateRegister}= require('../models/register');

router.get('/',async function(req,res){
    res.status(200).render("login");
});

router.post('/',async (req,res)=>{
    const {error}= validateRegister(req.body);//result.error(joi package)
    if(error)
        return res.status(400).send(error.details[0].message);

    let user= await Register.findOne({ Email: req.body.email});
    if(!user)
        return res.status(400).send('Invalid Username...');

    const validPassword = await  bcrypt.compare(req.body.password, user.Password);

    if(!validPassword)
        return res.status(400).send('Invalid password..');

    res.status(200).send({email:user.Email});
});

module.exports= router;