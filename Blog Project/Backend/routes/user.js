const express = require('express');
const { model } = require('mongoose');
const router = express.Router();
const { body } = require('express-validator')
const userControllers = require('../controllers/user')
const authMiddleware = require('../middlewares/auth.middlewares')


router.post('/register', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({min:3}).withMessage('First name must be at least 3 characters long'),
    body('password').isLength({min:6 }).withMessage('Password must be at least 6 characters long')
], userControllers.registerUser)

router.post('/login', [
    body('email').isEmail().withMessage("Invalid Email"),
    body('password').isLength({min:6}).withMessage('Password must be at least 6 characters long')
],
    userControllers.loginUser
)

router.get('/profile', authMiddleware.authUser, userControllers.getUserProfile)

module.exports = router
