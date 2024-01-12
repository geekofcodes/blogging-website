// src/services.js

const API_BASE_URL = 'http://localhost:5000/api';

const fetchPosts = async () => {
  return fetch(`${API_BASE_URL}/posts`)
    .then(response => response.json())
    .then(data => data.posts)
    .catch(error => {
      console.error('Error fetching posts:', error);
      throw error;
    });
};

export const createPost = async (newPost) => {
  try {
    const response = await fetch(`${API_BASE_URL}/create_post`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPost),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error('Error creating post:', error.message);
    throw error;
  }
};

const login = async (credentials) => {
  return fetch(`${API_BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  })
    .then(response => response.json())
    .then(data => {
      console.log(data.message);
      return data.token; // Return the token if needed
    })
    .catch(error => {
      console.error('Error logging in:', error);
      throw error;
    });
};

export const register = async (userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      console.log(response)
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error('Error registering user:', error.message);
    throw error;
  }
};

export { fetchPosts, login };
