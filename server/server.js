require('dotenv').config();
const express = require('express');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require('cors')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();

const Blog = require('./schemas/blogSchema.js');
const User = require("./schemas/userSchema.js");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get("/", async (req, res) =>{
        const posts = await Blog.find().lean();
        res.set('Content-Type', 'application/json');
        res.status(200).send(JSON.stringify(posts));
});

app.get("/blog/:id", async (req, res) => {
     const data = req.params;
     const post = await Blog.find({_id: data.id}).lean();
     res.json(post);
})

app.post("/add", async (req,res) => {
    await Blog.create({
        name: req.body.name,
        description: req.body.description,
        content: req.body.content,
        url: req.body.url,
        date: req.body.date
    });
    res.sendStatus(200)
});

app.delete("/delete/:id", async (req,res) => {
    const id = req.params.id
    console.log(id);
    await Blog.findByIdAndDelete(id);
    res.json({status: "success", msg:"Usunięto post"});
})

app.post("/signup", (req, res) => {
    if(!req.body.email || !req.body.password){
        res.status(403).json({msg: "Email or password wasn't provided"});
    }
    User.create({
        name: req.body.name,
        forename: req.body.forename,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10)
    }).then(user => {
        // const token = jwt.sign({id: user._id, email: user.email}, process.env.SECRET, {expiresIn: "500s"});
        res.json({success: true});
    }).catch(err => {
        res.status(400).json({msg:err});
    });
});

app.post("/login" , (req, res) => {
    if(!req.body.email || !req.body.password){
        res.status(403).json({msg: "Email or password wasn't provided"});
        return;
    } 

    User.findOne({email: req.body.email})
    .then(user => {
        if(!user){
            res.status(400).json({msg: "User does not exist"});
        } else {
            if(!bcrypt.compareSync(req.body.password, user.password)){
                res.status(400).json({msg: "Password for user is wrong"});
            } else {
                const token = jwt.sign({id: user._id, email: user.email, name:user.name, forename:user.forename}, process.env.SECRET, {expiresIn: "1000s"});
                res.json({token: token});
            }
        }
    }).catch(err => {
        console.log(err);
    });
});

app.get("/verify", (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.SECRET, (err, user) => {
        console.log(err)
    
        if (err) return res.sendStatus(403)
    
        res.json({msg: "User autorized", user:user})
  
    });
})

app.listen(process.env.PORT, () => {
    mongoose.connect(process.env.MONGO_URI, () =>{
        console.log("Connection established!");
    });
});