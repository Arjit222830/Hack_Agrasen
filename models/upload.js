const mongoose =require('mongoose');

const Upload= mongoose.model('uploads', new mongoose.Schema({
    link:{
        type: String,
        required: true
    },
})
);

module.exports.Upload= Upload;