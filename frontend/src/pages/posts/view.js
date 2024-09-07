import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import postService from '../../service/postService';
import commentService from '../../service/commentService';

const ViewPage = () => {
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState({ author: '', content: '' });

    useEffect(() => {
        postService.fetchPostById(postId)
            .then(data => setPost(data))
            .catch(error => console.error('Error fetching post:', error));

        commentService.fetchCommentsByPostId(postId)
            .then(data => setComments(data))
            .catch(error => console.error('Error fetching comments:', error));
    }, [postId]);

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        commentService.createComment(postId, newComment)
            .then(comment => setComments([...comments, comment]))
            .catch(error => console.error('Error adding comment:', error));
    };

    return (
        <div className="mx-10 md:mx-60 m-8">
            {post ? (
                <>
                    <h1 className="text-3xl font-bold mb-4 text-center">{post.title}</h1>

                    {post.image && (
                        <div className="mb-4 flex justify-center items-center">
                            <img src={post.image} alt="Blog post" className="max-w-full" />
                        </div>
                    )}

                    <div dangerouslySetInnerHTML={{ __html: post.content }} />

                    <h2 className="text-xl font-bold mb-4">Comments</h2>
                    <ul>
                        {comments?.map(comment => (
                            <li key={comment._id} className="mb-4 border p-2 rounded-md shadow-md">
                                <p className="font-bold">{comment.author}</p>
                                <p>{comment.content}</p>
                            </li>
                        ))}
                    </ul>

                    <form onSubmit={handleCommentSubmit} className="mt-4">
                        <input
                            type="text"
                            name="author"
                            value={newComment.author}
                            onChange={e => setNewComment({ ...newComment, author: e.target.value })}
                            className="w-full mb-2 p-2"
                            placeholder="Your name"
                        />
                        <textarea
                            name="content"
                            value={newComment.content}
                            onChange={e => setNewComment({ ...newComment, content: e.target.value })}
                            className="w-full mb-2 p-2"
                            placeholder="Your comment"
                        />
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2">Add Comment</button>
                    </form>

                    <div className="mt-4">
                        <Link to={`/edit/${postId}`}>
                            <button className="bg-blue-500 text-white px-4 py-2">Edit Post</button>
                        </Link>
                        <button onClick={() => window.history.back()} className="bg-blue-500 text-white px-4 py-2 ml-4">
                            Go Back
                        </button>
                    </div>
                </>
            ) : <p>Loading...</p>}
        </div>
    );
};

export default ViewPage;

