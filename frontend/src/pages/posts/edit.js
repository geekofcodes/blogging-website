import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import postService from "../../service/postService";
import ScrollProgressBar from "../../components/scrollProgressBar";
import BackToTopButton from "../../components/backToTop";

const EditPage = () => {
  const { postId } = useParams();
  const history = useHistory();
  const [post, setPost] = useState({
    title: "",
    content: "",
    author: "",
    image: "",
  });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPost((prevPost) => ({ ...prevPost, [name]: value }));
  };

  const handleContentChange = (content) => {
    setPost((prevPost) => ({ ...prevPost, content }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postService
      .updatePost(postId, post)
      .then(() => history.push(`/view/${postId}`))
      .catch((error) => console.error("Error updating post:", error));
  };

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    postService
      .fetchPostById(postId)
      .then((data) => setPost(data))
      .catch((error) => console.error("Error fetching post:", error));
  }, [postId]);

  useEffect(() => {
    document.title = "Edit your Blog Post";
    // Scroll event listener for progress bar and back to top button
    const handleScroll = () => {
      const totalScrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      const scrollPercent = (currentScroll / totalScrollHeight) * 100;
      setScrollProgress(scrollPercent);

      setIsScrolling(currentScroll > 0);
      setShowBackToTop(currentScroll > 300);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="mx-10 md:mx-60 m-8 relative">
      <ScrollProgressBar
        scrollProgress={scrollProgress}
        isScrolling={isScrolling}
      />
      <BackToTopButton
        showBackToTop={showBackToTop}
        handleBackToTop={handleBackToTop}
      />
      <h1 className="text-3xl font-bold mb-4 text-center">Edit Post</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2 font-bold" htmlFor="title">
            Title:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={post.title}
            onChange={handleInputChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-bold" htmlFor="content">
            Content:
          </label>
          <ReactQuill
            value={post.content}
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
            value={post.author}
            onChange={handleInputChange}
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
            value={post.image}
            onChange={handleInputChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
        >
          Update Post
        </button>
      </form>
    </div>
  );
};

export default EditPage;
