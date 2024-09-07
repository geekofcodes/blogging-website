import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

const PostCard = ({ post }) => (
    <div className="border p-4 mb-4 shadow-md rounded-md">
        {post.image && (
            <div className="shadow-sm">
                <img src={post.image} alt="Blog post" className="mt-2 max-w-full" />
            </div>
        )}
        <h2 className="text-xl font-bold">{post.title}</h2>
        <div dangerouslySetInnerHTML={{ __html: post.content.substring(0, 150) + '...' }} />
        <p className="text-sm text-gray-500 mt-2">Author: {post.author}</p>
        <p className="text-sm text-gray-500 mb-2">Created Date: {new Date(post.created_date).toLocaleDateString()}</p>
        <Link to={`/view/${post._id}`}>
            <Button variant='contained'>View Post</Button>
        </Link>
    </div>
);

export default PostCard;
