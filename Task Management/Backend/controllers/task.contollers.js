const { model } = require('mongoose');
const taskModel = require('../models/task.model');
const {validationResult} = require('express-validator');

module.exports.createTask = async(req, res) =>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    try{
        const {title, description, status, priority} = req.body;

        const task = await taskModel.create({
            title,
            description,
            status,
            priority,
            user: req.user._id
        });
        res.status(201).json(task)
    }catch(err){
        res.status(500).json({message: err.message})
    }
};

module.exports.getAllTasks = async(req, res, next) => {
    try{
        const tasks = await taskModel.find({user: req.user._id});
        res.status(200).json({tasks});
    }catch(err){
        res.status(500).json({message: err.message});
    }
}
// UPDATE Task CONTROLLER
module.exports.updateTask = async(req, res, next)=> {
    try{
        const {title, description, status, priority} = req.body;
        const task = await taskModel.findOneAndUpdate(
            {_id: req.params.id, user: req.user._id},
            {title, description, status, priority},
            {new: true}
        );
        if(!task){
            return res.status(404).json({message: 'Task not found'});
        }
        res.status(200).json(task)
    }catch(err){
        res.status(500).json({message: err.message})
    }
};

module.exports.deleteTask = async(req, res, next) =>{
    try{
        const task = await taskModel.findOneAndDelete({_id: req.params.id, user:req.user._id})
        if(!task) {
            return res.status(404).json({message: "Task not found"});
        }
        res.status(200).json({message: "Task deleted successfully"});
    }catch(err){
        res.status(500).json({message: err.message})
    }
};