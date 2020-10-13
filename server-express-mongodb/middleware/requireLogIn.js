const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../config/keys')
const mongoose = require('mongoose')
const User = mongoose.model("User")


module.exports = (req,res,next)=>{
    const token = req.header('authorization');
    //authorization === Bearer ewefwegwrherhe
    if(!token){
       return res.status(401).json({error:"you must be logged in"})
    }
    try {
        // Verify token
        const decoded = jwt.verify(token, JWT_SECRET);
        // Add user from payload
        req.user = decoded;
        next();
      } catch (e) {
        res.status(400).json({ error: "Please login"});
      } 
}
