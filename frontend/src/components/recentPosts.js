import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

const RecentPosts = ({ recentPosts }) => (
    <div className="w-full md:w-1/4 md:sticky top-8 h-max">
        <h2 className="text-xl font-bold mb-4">Recent Posts</h2>
        {recentPosts.map(post => (
            <div key={post._id} className="border p-4 mb-4 shadow-md rounded-md">
                <h3 className="text-lg font-bold">{post.title}</h3>
                <p className="text-sm text-gray-500">Author: {post.author}</p>
                <p className="text-sm text-gray-500">Date: {new Date(post.created_date).toLocaleDateString()}</p>
                <Link to={`/view/${post._id}`}>
                    <Button variant='outlined' size="small">Read More</Button>
                </Link>
            </div>
        ))}
    </div>
);

export default RecentPosts;
