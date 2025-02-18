const express = require('express');
const { createPost, deletePost, getAllPosts, getAllPostsByUser, getPostById, updatePost } = require('../controllers/postsController');
const authenticateUser = require('../middleware/authenticateUser');
const router = express.Router();

router.get('/getPostById/:id', getPostById);
router.get('/getAllPosts', getAllPosts);
router.get('/getByUser/:user_id', getAllPostsByUser);
router.post('/createPost', authenticateUser, createPost);
router.put('/update', authenticateUser, updatePost);
router.delete('/delete' , authenticateUser, deletePost);

module.exports = router;