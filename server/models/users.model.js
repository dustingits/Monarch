const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types

const Schema = mongoose.Schema;

const userSchema = new Schema({
    accountType: String,
    picture: {
        type: String,
        default: "http://placekitten.com/300/300"
    },
    username: {
        type: String,
        required: true
    }, email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    firstname: String,
    lastname: String,
    location: {
        address: String,
        lat: Number,
        lng: Number
    },
    categories: [{ value: String, label: String }],
    yearsXP: Number,
    gigs: Number,
    aboutMe: { type: String, default: "edit your about me" },

    influences: [{ value: String, label: String }],
    equipment: [String],
    links: {
        facebook: { type: String },
        instagram: { type: String },
        spotify: { type: String },
        etsy: { type: String }
    },
    audio: String,
    level: Number,
    featured: Boolean,
    premiere: Boolean,
    followers: [{ type: ObjectId, ref: "User" }],
    following: [{ type: ObjectId, ref: "User" }],

});

const User = mongoose.model('User', userSchema);

module.exports = User;