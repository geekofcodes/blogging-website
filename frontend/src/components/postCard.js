import React from 'react';
import { Link } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const PostCard = ({ post }) => {
    const createdDaysAgo = dayjs(post.created_date).fromNow(true);
    const updatedDaysAgo = dayjs(post.modified_date).fromNow(true);

    return (
        <div className="p-6 mb-8" style={{ fontFamily: 'Mulish, sans-serif' }}>
            {post.image && (
                <div className="h-96 overflow-hidden">
                    <img
                        src={post.image}
                        alt="Blog post"
                        className="w-full h-full object-cover"
                    />
                </div>
            )}

            {/* Title with link and hover animation */}
            <Link
                to={`/view/${post._id}`}
                className="block text-2xl font-bold mt-4 px-32 text-center transition-transform duration-300 hover:scale-105 hover:text-blue-600"
            >
                {post.title}
            </Link>

            {/* Created and Updated Dates */}
            <p className="text-sm text-gray-500 my-2 px-32">
                {updatedDaysAgo && `Updated: ${updatedDaysAgo} ago`} • Created: {createdDaysAgo} ago
            </p>

            {/* Content with padding and Read More link */}
            <div className="text-justify px-32 mb-4">
                <div dangerouslySetInnerHTML={{ __html: post.content.substring(0, 215) }} />
                {post.content.length > 215 && (
                    <Link
                        to={`/view/${post._id}`}
                        className="text-blue-600 hover:text-blue-800 inline-flex items-center"
                    >
                        Read More
                        <ArrowForwardIcon
                            fontSize="small"
                            className="ml-1 transform transition-transform hover:translate-x-1"
                        />
                    </Link>
                )}
            </div>

            {/* Separator and Author */}
            <hr className="mb-4" />
            <p className="text-sm text-gray-500 px-4">Author: {post.author}</p>
        </div>
    );
};

export default PostCard;
