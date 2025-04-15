const mongoose = require('mongoose');
const express = require('express');

const postSchema = new mongoose.Schema({
    postText : {
        type: String,
        required : true
    },
    crratedAt : {
        type : Date,
        default: Date.now()
    },
    users : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user'
        // this is the user model which is imported in users.js file
    }],
     likes : {
        type : Array,
        default: []
     }
})

module.exports = mongoose.model('posts',postSchema)