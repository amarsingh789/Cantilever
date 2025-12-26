const express = require('express');
const path = require('path');
const router = express.Router();
const postControllers = require('../controllers/post.js')
const authMiddleware = require('../middlewares/auth.middlewares')
const multer = require('multer');


const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads')
    },
    filename: function(req, file,cb){
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null,  file.originalname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({storage: storage});

router.post('/create', authMiddleware.authUser, upload.single('coverImage'), postControllers.createPost);
router.get('/all', postControllers.getAllPosts);
module.exports = router;