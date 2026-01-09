const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/auth.middleware.js')
const taskController = require('../controllers/task.contollers.js')
const {body} = require('express-validator')
const { route } = require('./user.routes')

router.post('/create', [
    authMiddleware.authUser,
    body('title').isLength({min: 3}).withMessage('Title must be at least 3 chars')
], taskController.createTask);

router.get('/all', authMiddleware.authUser, taskController.getAllTasks);

router.patch('/update/:id', authMiddleware.authUser, taskController.updateTask);

router.delete('/delete/:id', authMiddleware.authUser, taskController.deleteTask);

module.exports = router;
