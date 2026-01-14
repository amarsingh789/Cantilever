const express = require('express');
const path = require('path');
const router = express.Router();
const postControllers = require('../controllers/post.js')
const authMiddleware = require('../middlewares/auth.middlewares')
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params:{
        folder: 'mindstream_uploads',
        allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
    }
})
const upload = multer({storage: storage});

router.post('/create', authMiddleware.authUser, upload.single('coverImage'), postControllers.createPost);
router.get('/all', postControllers.getAllPosts);
router.get('/get/:id', postControllers.getPostById);
router.put('/update/:id', authMiddleware.authUser, upload.single('coverImage'), postControllers.updatePost);
router.delete('/delete/:id', authMiddleware.authUser, postControllers.deletePost)
router.get('/my-posts', authMiddleware.authUser, postControllers.getUserPosts)
module.exports = router;