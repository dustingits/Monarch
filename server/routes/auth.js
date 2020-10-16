const express = require('express');
const router = express.Router();
const UserModel = require('../models/users.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/keys');
const requirelogin = require('../middleware/requireLogIn');

router.get('/protected',requirelogin, (req, res) => {
    res.send("hello User")
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    // Simple validation
    if (!email|| !password) {
      return res.status(400).json({ error: 'Please enter all fields' });
    }   
  
    try {
      // Check for existing user
      const user = await UserModel.findOne({ email });
      if (!user) throw Error('User does not exist');
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) throw Error('Invalid credentials');
  
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: 3600 });
      if (!token) throw Error('Couldnt sign the token');
  
      res.status(200).json({
        token,
        user
    
      });
    } catch (e) {
        res.status(400).json({ error: e.message })
    }
  });

  router.post('/signup', async (req, res) => {
    const { username, email, password} = req.body;
  
    // Simple validation
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'Please enter all fields' });
    }
  
    try {
      const user = await UserModel.findOne({ email });
      if (user) throw Error('User already exists');
  
      const salt = await bcrypt.genSalt(10);
      if (!salt) throw Error('Something went wrong with bcrypt');
  
      const hash = await bcrypt.hash(password, salt);
      if (!hash) throw Error('Something went wrong hashing the password');
  
      const newUser = new UserModel({
        username,
        email,
        password: hash
      });
  
      const savedUser = await newUser.save();
      if (!savedUser) throw Error('Something went wrong saving the user');
  
      const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET, {
        expiresIn: 3600
      });
  
      res.status(200).json({
        token,
        user: {
          _id: savedUser._id,
          name: savedUser.name,
          email: savedUser.email
        }
      });
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  });

module.exports = router;