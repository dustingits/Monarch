const mongoose = require ('mongoose');
const { ObjectId } = mongoose.Schema.Types

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username:{
        type:String,
        required:true
    },
    firstname:{type:String, default:"New"},
    lastname:{type:String, default:"User"},
    facebook:{type:String, default:"https://www.facebook.com/"},
    instagram:{type:String, default:"https://www.instagram.com/"},
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
    },
    aboutme:{type:String, default:"edit your about me"},
    categories:[String],
    resetToken:String,
    expireToken:Date,
    picture:{
     type:String,
     default:"http://placekitten.com/300/300"
    },
    location:{
        address:String,
        lat:Number,
        lng:Number
    },
    followers:[{type:ObjectId,ref:"User"}],
    following:[{type:ObjectId,ref:"User"}]
});

const User = mongoose.model('User', userSchema);

module.exports = User;