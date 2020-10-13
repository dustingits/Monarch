const mongoose = require ('mongoose');
const {ObjectId} = mongoose.Schema.Types
const Schema = mongoose.Schema;

let postsSchema = new Schema({
    postedBy: {type: ObjectId, ref:"User"},
    title: String ,
    likes:[{type:ObjectId,ref:"User"}],
    comments:[{
        text:String,
        postedBy:{type:ObjectId,ref:"User"},
        upVote:[{type:ObjectId,ref:"User"}],
    }],
    date: Date,
    picture: String,
    video:String,
    content: String,
    
});

const Post = mongoose.model('Post', postsSchema);

module.exports = Post;  