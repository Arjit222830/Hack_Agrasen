const express= require('express');
const router= express.Router();
const auth= require('../middleware/auth');
const {Fb_Register}= require('../models/facebook_register');
const {Google_Register}= require('../models/google_register');
const {Register}= require('../models/register');
const {Upload}= require('../models/upload');

router.get('/:value-:id',async function(req,res){
    let info;
    if(req.params.value==1)
        info= await Register.find({Email: req.params.id});
    else if(req.params.value==2)
        info= await Fb_Register.find({facebookID: req.params.id});
    else 
        info= await Google_Register.find({googleID: req.params.id});
    let uploads= await Upload.find();
    return res.status(200).render('dashboard',{info: Object.assign({}, info)[0], value:req.params.value, uploads: uploads, id: req.params.id});
});

router.post('/',auth,async function(req,res){
    res.status(200).send({link:"/dashboard/1-"+req.header('email'),message:"successfully logged in"})
});

module.exports= router;