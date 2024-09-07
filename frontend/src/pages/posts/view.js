import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import postService from '../../service/postService';
import commentService from '../../service/commentService';
import ScrollProgressBar from '../../components/scrollProgressBar';
import BackToTopButton from '../../components/backToTop';

const ViewPage = () => {
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState({ author: '', content: '' });
    const [scrollProgress, setScrollProgress] = useState(0);
    const [isScrolling, setIsScrolling] = useState(false);
    const [showBackToTop, setShowBackToTop] = useState(false);

    const handleBackToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        commentService.createComment(postId, newComment)
            .then(comment => setComments([...comments, comment]))
            .catch(error => console.error('Error adding comment:', error));
    };

    useEffect(() => {
        postService.fetchPostById(postId)
            .then(data => setPost(data))
            .catch(error => console.error('Error fetching post:', error));

        commentService.fetchCommentsByPostId(postId)
            .then(data => setComments(data))
            .catch(error => console.error('Error fetching comments:', error));

        // Scroll event listener for progress bar and back to top button
        const handleScroll = () => {
            const totalScrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const currentScroll = window.scrollY;
            const scrollPercent = (currentScroll / totalScrollHeight) * 100;
            setScrollProgress(scrollPercent);

            setIsScrolling(currentScroll > 0);
            setShowBackToTop(currentScroll > 300);
        };

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, [postId]);

    return (
        <div className="mx-10 md:mx-60 m-8 relative">
            <ScrollProgressBar scrollProgress={scrollProgress} isScrolling={isScrolling} />
            <BackToTopButton showBackToTop={showBackToTop} handleBackToTop={handleBackToTop} />

            {post ? (
                <>
                    {/* Fade In Animation for Title */}
                    <motion.h1
                        className="text-3xl font-bold mb-4 text-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                    >
                        {post.title}
                    </motion.h1>

                    {/* Fade In Animation for Image */}
                    {post.image && (
                        <motion.div
                            className="mb-4 flex justify-center items-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 0.1 }}
                        >
                            <img src={post.image} alt="Blog post" className="max-w-full" />
                        </motion.div>
                    )}

                    {/* Fade In Animation for Content */}
                    <motion.div
                        dangerouslySetInnerHTML={{ __html: post.content }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.5 }}
                    />

                    {/* Slide-In Animation for Comments */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 1.5 }}
                    >
                        <h2 className="text-xl font-bold mb-4">Comments</h2>
                        <ul>
                            {comments.map(comment => (
                                <li key={comment._id} className="mb-4 border p-2 rounded-md shadow-md">
                                    <p className="font-bold">{comment.author}</p>
                                    <p>{comment.content}</p>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Comment Form */}
                    <form onSubmit={handleCommentSubmit} className="mt-4">
                        <input
                            type="text"
                            name="author"
                            value={newComment.author}
                            onChange={e => setNewComment({ ...newComment, author: e.target.value })}
                            className="w-full mb-2 p-2 border border-gray-300 rounded-md shadow-sm"
                            placeholder="Your name"
                        />
                        <textarea
                            name="content"
                            value={newComment.content}
                            onChange={e => setNewComment({ ...newComment, content: e.target.value })}
                            className="w-full mb-2 p-2 border border-gray-300 rounded-md shadow-sm"
                            placeholder="Your comment"
                        />
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 transition-transform transform hover:scale-105"
                        >
                            Add Comment
                        </button>
                    </form>

                    {/* Buttons with Independent Animation */}
                    <div className="mt-4 flex space-x-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Link to={`/edit/${postId}`}>
                                <button className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 transition-transform transform hover:scale-105">
                                    Edit Post
                                </button>
                            </Link>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <button
                                onClick={() => window.history.back()}
                                className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 transition-transform transform hover:scale-105"
                            >
                                Go Back
                            </button>
                        </motion.div>
                    </div>
                </>
            ) : <p>Loading...</p>
            }
        </div>
    );
};

export default ViewPage;

