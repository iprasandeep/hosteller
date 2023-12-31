const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const User = require('./models/User');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser')

const bcrypt = require('bcrypt');
const bcryptSalt = bcrypt.genSaltSync(10);

const jwtSecret = 'fasfewfdsfdsfdffsa';

require('dotenv').config();

app.use(express.json());
app.use(cookieParser())

const corsConfig = {
    credentials: true,
    origin: 'http://127.0.0.1:5173',
};
app.use(cors(corsConfig));

// DB
// console.log(process.env.MONGO_URL);

mongoose.connect(process.env.MONGO_URL);

app.get('/test', (req, res) =>{
    return res.json('Test Ok: 200')
})

app.post('/register', async (req, res) =>{
    const {name, email, password } = req.body;
    console.log(name, email, password);
    try{
        const userDoc = await User.create({
            name, 
            email,
            password: bcrypt.hashSync(password, bcryptSalt),
    
        });
        res.json(userDoc);
        console.log(userDoc);
    } catch(err){
        res.status(422).json(err);
    }
})

// login
app.post('/login', async (req,res) => {
    mongoose.connect(process.env.MONGO_URL);
    const {email,password} = req.body;
    const userDoc = await User.findOne({email});
    if (userDoc) {
      const passOk = bcrypt.compareSync(password, userDoc.password);
      if (passOk) {
        jwt.sign({
          email:userDoc.email,
          id:userDoc._id
        }, jwtSecret, {}, (err,token) => {
          if (err) throw err;
          res.cookie('token', token).json(userDoc);
        });
      } else {
        res.status(422).json('pass not ok');
      }
    } else {
      res.json('not found');
    }
  });
//user profile
app.get('/profile', (req,res) => {
    mongoose.connect(process.env.MONGO_URL);
    const {token} = req.cookies;
    // res.json({token});
    if (token) {
      jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        const {name,email,_id} = await User.findById(userData.id);
        res.json({name,email,_id});
      });
    } else {
      res.json(null);
    }
  });
  
  app.post('/logout', (req, res) =>{
    res.cookie('token', '').json(true);
  })
  // port listening

  app.listen(process.env.PORT || 4012, () => {
    console.log('Server is listening on port 4012');
});
