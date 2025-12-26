const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    coverImage: {
        type: String,
        required: true,
    },
    category:{
        type: String,
        required: true,
        enum: ['Technology', 'Health', 'Lifestyle', 'Education', 'Entertainment', 'Business', 'Travel', 'Food', 'Sports', 'Finance']
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    createdAt:{
        type: Date,
        default: Date.now,
    }
})

const postModel = mongoose.model('post', postSchema)
module.exports = postModel;