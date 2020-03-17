const express= require('express');
const router= express.Router();
const auth= require('../middleware/auth');

router.get('/d?:password',async function(req,res){
    res.status(200).render('dashboard');
});

router.post('/',auth,async function(req,res){
    res.status(200).send({link:"/dashboard/d?"+req.header('password'),message:"successfully logged in"})
});

module.exports= router;