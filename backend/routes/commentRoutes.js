const express = require('express');
const { createComment, getCommentsByPostId } = require('../controllers/commentController');
const router = express.Router();

router.post('/posts/:post_id/comments', createComment);
router.get('/posts/:post_id/comments', getCommentsByPostId);

module.exports = router;