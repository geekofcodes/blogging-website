import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { createPost } from '../service/Service';

const UploadPage = () => {
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    author: '',
    created_date: '',
    image: '',
  });

  const handleInputChange = (name, value) => {
    setNewPost({ ...newPost, [name]: value });
  };

  const handleContentChange = (content) => {
    setNewPost({ ...newPost, content });
  };

  const resetForm = () => {
    setNewPost({
      title: '',
      content: '',
      author: '',
      created_date: '',
      image: '',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createPost(newPost);
      resetForm();
    } catch (error) {
      console.error('Error handling submit:', error);
    }
  };

  return (
    <div className="container mx-auto mt-8 max-w-2xl bg-white p-8 rounded shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-center">Upload Blog Post</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2 font-bold" htmlFor="title">
            Title:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={newPost.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-bold" htmlFor="content">
            Content:
          </label>
          <ReactQuill
            value={newPost.content}
            onChange={handleContentChange}
            className="rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-bold" htmlFor="author">
            Author:
          </label>
          <input
            type="text"
            id="author"
            name="author"
            value={newPost.author}
            onChange={(e) => handleInputChange('author', e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-bold" htmlFor="created_date">
            Created Date:
          </label>
          <input
            type="date"
            id="created_date"
            name="created_date"
            value={newPost.created_date}
            onChange={(e) => handleInputChange('created_date', e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-bold" htmlFor="image">
            Image URL:
          </label>
          <input
            type="text"
            id="image"
            name="image"
            value={newPost.image}
            onChange={(e) => handleInputChange('image', e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default UploadPage;
