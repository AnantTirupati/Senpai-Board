var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var plm = require('passport-local-mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/Senpai_Board')


const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required : true,
    // unique : true,
  },
  password : {
    type : String,
    // required: true,
  },
  posts: [{
    type : mongoose.Schema.Types.ObjectId,
    // this is the post model which is imported in posts.js file
    ref : 'post',
  }],
  dp: {
    type : String   // as a url
  },
  email: {
    type: String,
    required : true,
    // unique : true
  },
  fullname : {
    type: String,
    required : true,
  }
  
})


userSchema.plugin(plm);
const user = mongoose.model ('user', userSchema)
module.exports = user;
