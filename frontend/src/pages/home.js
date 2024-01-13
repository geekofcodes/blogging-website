import React, { useState, useEffect } from 'react';
import { fetchPosts } from '../service/Service';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import { Button } from '@mui/material';

const HomePage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch posts from the backend API using the service
    fetchPosts()
      .then(data => setPosts(data))
      .catch(error => console.error('Error fetching posts:', error));
  }, []);

  return (
    <div className="mx-10 md:mx-20 mt-8 mb-8">
      <h1 className="text-3xl font-bold mb-4">Blogging Website</h1>

      {/* Display existing blog posts */}
      <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4'>
        {posts.map(post => (
          <div 
            key={post._id} 
            className="border p-4 mb-4 shadow-md rounded-md"
          >
            {/* Display image if available */}
            {post.image && (
              <div className="shadow-sm">
                <img src={post.image} alt="Blog post" className="mt-2 max-w-full" />
              </div>
            )}
            <h2 className="text-xl font-bold">{post.title}</h2>
            {/* <p>{post.content}</p> */}
            {/* <p>{post.content.substring(0, 150)}...</p> */}
            <div dangerouslySetInnerHTML={{ __html: post.content.substring(0, 150) + '...' }} />

            {/* Display additional fields */}
            <p className="text-sm text-gray-500 mt-2">Author: {post.author}</p>
            {/* <p className="text-sm text-gray-500">Created Date: {post.created_date}</p> */}
            <p className="text-sm text-gray-500 mb-2">Created Date: {new Date(post.created_date.$date).toLocaleDateString()}</p>
            <Link 
              to={`/view/${post._id.$oid}`} 
              // className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-4 bg-blue-500 text-white px-4 py-2 rounded"
            >
              <Button variant='contained'>View Post</Button>
            </Link>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
