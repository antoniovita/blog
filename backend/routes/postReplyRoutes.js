const express = require('express');
const { createPostReply, deletePostReply, getAllPostReplies, getAllPostRepliesByUser, getPostReplyById, updatePostReply } = require('../controllers/postRepliesController');
const authenticateUser = require('../middleware/authenticateUser');
const router = express.Router();

router.put('/update', authenticateUser, updatePostReply);
router.post('/create', authenticateUser, createPostReply);
router.delete('/delete' , authenticateUser, deletePostReply);
router.get('/getAll' , getAllPostReplies);
router.get('/getAllByUser' , getAllPostReplies);
router.get('/getById' , getPostReplyById);

module.exports = router;

