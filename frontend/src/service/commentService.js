import { config } from "../config";

const API_BASE_URL = config.base_url

const commentService = {
    createComment: async (postId, comment) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/posts/${postId}/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(comment),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to create comment');
            }

            const data = await response.json();
            return data.comment;
        } catch (error) {
            console.error('Error creating comment:', error.message);
            throw error;
        }
    },

    fetchCommentsByPostId: async (postId) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/posts/${postId}/comments`);
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to fetch comments');
            }

            const data = await response.json();
            return data.data.comments;
        } catch (error) {
            console.error('Error fetching comments:', error.message);
            throw error;
        }
    }
};

export default commentService;
