var mongoose = require("mongoose");
var express= require("express");
var app = express();
var bodyParser = require("body-parser");
const config= require('config');
const bcrypt= require('bcrypt');
const jwt = require('jsonwebtoken');
const _=  require('lodash');
const {Register, validateRegister}= require('./models/register');

mongoose.connect(config.get('db'),{useNewUrlParser: true,useUnifiedTopology: true})
    .then(()=> console.log(`Connected to ${config.get('db')}...`))
    .catch(err => console.log(`Could not connect to ${config.get('db')}...`,err));

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

app.use(express.json());

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));

require('./prod.js')(app);

app.set("view engine", "pug");

app.get('/',async function(req,res){
    res.status(200).render("registration");
});

app.post('/',async (req,res)=>{
    const {error}= validateRegister(req.body);//result.error(joi package)
    if(error)
        return res.status(400).send(error.details[0].message);

    let user= await Register.findOne({Email: req.body.email});
    if(user)
        return res.status(400).send('User already registered..');

    const json= _.pick(req.body,['name', 'email', 'password']);

    const salt= await bcrypt.genSalt(10);
    json.password = await bcrypt.hash(json.password,salt);

    var token = jwt.sign(json, config.get('jwtPrivateKey'));

    console.log("token:"+token)
    
    const register= new Register({
        Email: json.email,
        Password: json.password
    })

    await register.save();

    res.header('x-auth-token',token).send({token:token,message:'Registration Successful...',link:'/'});
});

const port=process.env.PORT || 3000;
console.log(port);
const server=app.listen(port, ()=> console.log(`Listening on port ${port}...`));
var env = process.env.NODE_ENV || 'development';
console.log(env);
module.exports= server;