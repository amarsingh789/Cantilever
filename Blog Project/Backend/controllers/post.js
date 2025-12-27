const { model } = require('mongoose');
const postModel = require('../models/post');

module.exports.createPost = async(req, res, next) =>{
    try{
        console.log("Body Data:", req.body); 
        console.log("File Data:", req.file);
        const { title, content, category} = req.body;

        if(!req.file){
            return res.status(400).json({message: 'cover image is required'})
        }
        const coverImage = `http://localhost:4000/uploads/${req.file.filename}`;

        const post = await postModel.create({
            title,
            content,
            coverImage,
            category,
            author: req.user._id
        });
        res.status(201).json({post});
    }catch(err){
        res.status(400).json({message: err.message});
    }
}

module.exports.getAllPosts = async(req, res, next) => {
    try{
        const posts = await postModel.find().populate('author', 'fullname email').sort({createdAt: -1});
        res.status(200).json({posts});
    }catch(err){
        res.status(500).json({message: err.message});
    }
}