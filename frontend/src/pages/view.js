import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom';// Assuming you are using React Router
import postService from '../service/postService';


const ViewPage = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    postService.fetchPostById(postId)
    .then(data => {
      setPost(data)
      console.log(data)
    })
    .catch(error => console.error('Error fetching post:', error));
  }, [postId]);

  if (!post) {
    return <p>Loading...</p>;
  }

  return (
    <div className="mx-10 md:mx-60 m-8">
      <h1 className="text-3xl font-bold mb-4 text-center">{post.title}</h1>

      {post.image && (
        <div className="mb-4 flex justify-center items-center">
          <img src={post.image} alt="Blog post" className="max-w-full" />
        </div>
      )}

      {/* Render formatted HTML content */}
      <div dangerouslySetInnerHTML={{ __html: post.content }}  />

      <p className="text-sm text-gray-500 mt-2">Author: {post.author}</p>
      <p className="text-sm text-gray-500">Created Date: {new Date(post.created_date).toLocaleDateString()}</p>

      {/* Add a button to go back to the homepage or implement your own navigation logic */}
      <button onClick={() => window.history.back()} className="bg-blue-500 text-white px-4 py-2 mt-4">
        Go Back
      </button>
    </div>
  );
};

export default ViewPage;
