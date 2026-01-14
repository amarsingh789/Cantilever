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
        const coverImage = req.file ? req.file.path : "";

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

module.exports.getPostById = async(req, res, next) => {
    try{
        const postId = req.params.id;
        const post = await postModel.findById(postId).populate('author', 'fullname email');

        if(!post){
            return res.status(404).json({message: 'Post not found'});
        }
        res.status(200).json({post});
    }catch(err){
        res.status(500).json({message: err.message})
    }
}
// UPDATE POST CONTROLLER
module.exports.updatePost = async(req, res, next) => {
    try{
        const postId = req.params.id;
        const { title, content, category} = req.body;

        const  post = await postModel.findById(postId);
        if(!post){
            return res.status(404).json({message: 'Post not found'})
        }
        if(post.author.toString() !== req.user._id.toString()){
            return res.status(403).json({message: 'Unauthorized action'})
        }

        let updateData = {
            title,
            content,
            category
        };
        if(req.file){
            updateData.coverImage = req.file.path;
        }
        const updatedPost = await postModel.findByIdAndUpdate(postId, updateData, {new: true});
        res.status(200).json({message: 'Post updated successfully', post: updatedPost})
    }catch(err){
        res.status(500).json({message: err.message})
    }
}

// Delete Post Controller
module.exports.deletePost = async(req, res, next) => {
    try{
        const postId = req.params.id;

        const post = await postModel.findById(postId);
        if(!post){
            return res.status(404).json({message: 'Post not found'})
        }
        if(post.author.toString() !== req.user._id.toString()){
            return res.status(403).json({message: "Unauthorized action"})
        }
        await postModel.findByIdAndDelete(postId);
        res.status(200).json({message: 'Post deleted successfully'})
    }catch(err){
        res.status(500).json({message: err.message})
    }
}

// Get User's posts
module.exports.getUserPosts = async(req, res, next) => {
    try{
        const userId = req.user._id;
        console.log(userId);
        const posts = await postModel.find({author: userId}).sort({createdAt: -1});
        res.status(200).json({posts})
    }catch(err){
        res.status(500).json({message: err.message})
    }
}