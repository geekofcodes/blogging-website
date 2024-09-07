const express = require('express');
const { getPosts, getPostById, createPost, updatePost } = require('../controllers/postController');
const router = express.Router();

router.get('/posts', getPosts);
router.get('/posts/:post_id', getPostById);
router.post('/post', createPost);
router.put('/posts/:post_id', updatePost);


module.exports = router;
