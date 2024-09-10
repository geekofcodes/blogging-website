import React from 'react';
import { Link } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const RecentPosts = ({ recentPosts }) => (
    <div className="w-full md:w-1/4 md:sticky top-8 h-max">
        <h2 className="text-xl font-bold mb-4">Recent Posts</h2>
        {recentPosts.map(post => (
            <div key={post._id} className="border p-4 mb-4 shadow-md rounded-md">
                {/* Title with hover and click functionality */}
                <Link
                    to={`/view/${post._id}`}
                    className="block text-lg font-bold transition-transform duration-300 hover:scale-105 hover:text-blue-600"
                >
                    {post.title}
                </Link>

                {/* Author and Date */}
                <p className="text-sm text-gray-500 my-1">Author: {post.author}</p>
                <p className="text-sm text-gray-500 my-1">Date: {new Date(post.created_date).toLocaleDateString()}</p>

                {/* Read More link with arrow icon */}
                <Link
                    to={`/view/${post._id}`}
                    className="text-blue-600 hover:text-blue-800 inline-flex items-center mt-2"
                >
                    Read More
                    <ArrowForwardIcon
                        fontSize="small"
                        className="ml-1 transform transition-transform hover:translate-x-1"
                    />
                </Link>
            </div>
        ))}
    </div>
);

export default RecentPosts;
