const Post = require('../models/postModel');
const {handleSuccess, handleError} = require('../utils/responseHandlers')

// Get all posts
exports.getPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        return handleSuccess(res, { posts }, 200);
    } catch (error) {
        return handleError(res, error.message, 500);
    }
};

// Get a specific post by ID
exports.getPostById = async (req, res) => {
    const { post_id } = req.params;

    try {
        const post = await Post.findById(post_id);
        if (!post) {
            return handleError(res, 'Post not found', 404);
        }
        return handleSuccess(res, { post }, 200);
    } catch (error) {
        return handleError(res, error.message, 500);
    }
};

// Create a new post
exports.createPost = async (req, res) => {
    const { title, content, author, image } = req.body;

    if (!title || !content || !author) {
        return handleError(res, 'Missing required fields', 400);
    }

    try {
        const newPost = new Post({
            title,
            content,
            author,
            image
        });

        await newPost.save();
        return handleSuccess(res, { post_id: newPost._id }, 201);
    } catch (error) {
        return handleError(res, error.message, 500);
    }
};
