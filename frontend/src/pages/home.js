import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import postService from "../service/postService";
import PostCard from "../components/postCard";
import RecentPosts from "../components/recentPosts";
import ScrollProgressBar from "../components/scrollProgressBar";
import BackToTopButton from "../components/backToTop";

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [recentPosts, setRecentPosts] = useState([]);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const postsPerPage = 6;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePageChange = (direction) => {
    if (direction === "next" && indexOfLastPost < posts.length) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({
        top: document.getElementById("post-section").offsetTop,
        behavior: "smooth",
      });
    } else if (direction === "prev" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({
        top: document.getElementById("post-section").offsetTop,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await postService.fetchPosts();
        setPosts(data);
        setRecentPosts(data.slice(0, 5));
      } catch (error) {
        console.error("Error fetching posts:", error);
        setError("Failed to load posts. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();

    const handleScroll = () => {
      const totalScrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      setScrollProgress((currentScroll / totalScrollHeight) * 100);
      setIsScrolling(currentScroll > 0);
      setShowBackToTop(currentScroll > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.title = "Apex Archives: Explore Ideas, Inspire Minds ";
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col">
      <ScrollProgressBar scrollProgress={scrollProgress} isScrolling={isScrolling} />
      <BackToTopButton showBackToTop={showBackToTop} handleBackToTop={handleBackToTop} />

      <div className="flex-1 mx-10 md:mx-20 mt-8 mb-8">
        <h1 className="text-3xl text-center font-bold mb-4">Blogging Website</h1>

        {loading ? (
          // Full-height loader to prevent shifting
          <motion.div
            className="flex justify-center items-center min-h-[60vh]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex space-x-2">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-5 h-5 bg-blue-500 rounded-full"
                  animate={{ y: [0, -15, 0] }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>
          </motion.div>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <div id="post-section" className="flex flex-col md:flex-row gap-8">
            <div className="flex-1">
              {currentPosts.map((post) => (
                <motion.div
                  key={post._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <PostCard post={post} />
                </motion.div>
              ))}

              <motion.div
                className="flex justify-between mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <button
                  onClick={() => handlePageChange("prev")}
                  disabled={currentPage === 1}
                  className={`px-6 py-3 rounded-lg transition-transform transform hover:scale-105 focus:outline-none ${
                    currentPage === 1
                      ? "bg-gray-300 cursor-not-allowed text-gray-600"
                      : "bg-gradient-to-r from-blue-500 to-teal-500 text-white shadow-lg hover:from-blue-600 hover:to-teal-600"
                  }`}
                >
                  Previous
                </button>

                <button
                  onClick={() => handlePageChange("next")}
                  disabled={indexOfLastPost >= posts.length}
                  className={`px-6 py-3 rounded-lg transition-transform transform hover:scale-105 focus:outline-none ${
                    indexOfLastPost >= posts.length
                      ? "bg-gray-300 cursor-not-allowed text-gray-600"
                      : "bg-gradient-to-r from-blue-500 to-teal-500 text-white shadow-lg hover:from-blue-600 hover:to-teal-600"
                  }`}
                >
                  Next
                </button>
              </motion.div>
            </div>

            <RecentPosts recentPosts={recentPosts} />
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;


