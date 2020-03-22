const express= require('express');
const router= express.Router();
const {Upload}= require('../models/upload');
const multer= require('multer');
const storage = multer.diskStorage({
   destination: function (req, file, cb) {cb(null, './public/uploads')},filename: function (req, file, cb) { cb(null, file.originalname) }
});
const upload = multer({ storage: storage });

router.post('/',upload.fields([{ name: 'file'}]), async (req,res)=>{

   req.files['file'][0];

   const upload= new Upload({
      link: "../uploads/"+req.files['file'][0].originalname,
  })

  await upload.save();

   res.send({link:'/dashboard/'+req.headers['value']+"-"+req.headers['id'],message:"File Uploaded"});
});

module.exports= router;