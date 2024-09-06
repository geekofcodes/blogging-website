const express = require('express');
const { getPosts, getPostById, createPost } = require('../controllers/postController');
const router = express.Router();

router.get('/posts', getPosts);
router.get('/posts/:post_id', getPostById);
router.post('/posts', createPost);

module.exports = router;
