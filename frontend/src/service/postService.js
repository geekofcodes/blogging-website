import { config } from "../config";
const API_BASE_URL = config.base_url;

const postService = {
    fetchPosts: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/posts`);
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to fetch posts');
            }
            const data = await response.json();
            return data.data.posts;
        } catch (error) {
            console.error('Error fetching posts:', error.message);
            throw error;
        }
    },

    fetchPostById: async (postId) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/posts/${postId}`);
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to fetch post by ID');
            }
            const data = await response.json();
            return data.data.post;
        } catch (error) {
            console.error('Error fetching post by ID:', error.message);
            throw error;
        }
    },

    createPost: async (newPost) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/post`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newPost),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to create post');
            }

            const responseData = await response.json();
            return responseData;
        } catch (error) {
            console.error('Error creating post:', error.message);
            throw error;
        }
    }
};

export default postService;
