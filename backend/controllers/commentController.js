const Comment = require('../models/commentModel');
const { handleSuccess, handleError } = require('../utils/responseHandlers');

// Create a comment
exports.createComment = async (req, res) => {
    const { post_id } = req.params
    const { author, content } = req.body;

    if (!author || !content) {
        return handleError(res, 'Missing required fields', 400);
    }

    try {
        const newComment = new Comment({ postId: post_id, author, content });
        await newComment.save();
        return handleSuccess(res, { comment: newComment }, 201);
    } catch (error) {
        return handleError(res, error.message, 500);
    }
};

// Get comments by post ID
exports.getCommentsByPostId = async (req, res) => {
    const { post_id } = req.params;

    try {
        const comments = await Comment.find({ postId: post_id });
        return handleSuccess(res, { comments }, 200);
    } catch (error) {
        return handleError(res, error.message, 500);
    }
};
