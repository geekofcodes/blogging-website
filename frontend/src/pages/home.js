// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom/cjs/react-router-dom';
// import { Button } from '@mui/material';
// import { motion } from 'framer-motion';
// import { FaArrowUp } from 'react-icons/fa'; // Import an icon for the button
// import postService from '../service/postService';

// const HomePage = () => {
//   const [posts, setPosts] = useState([]);
//   const [recentPosts, setRecentPosts] = useState([]);
//   const [scrollProgress, setScrollProgress] = useState(0);
//   const [isScrolling, setIsScrolling] = useState(false);
//   const [showBackToTop, setShowBackToTop] = useState(false);

//   useEffect(() => {
//     // Fetch posts and recent posts
//     postService.fetchPosts()
//       .then(data => {
//         setPosts(data);
//         setRecentPosts(data.slice(0, 3));
//       })
//       .catch(error => console.error('Error fetching posts:', error));

//     // Scroll event listener for progress bar and back to top button
//     const handleScroll = () => {
//       const totalScrollHeight = document.documentElement.scrollHeight - window.innerHeight;
//       const currentScroll = window.scrollY;
//       const scrollPercent = (currentScroll / totalScrollHeight) * 100;
//       setScrollProgress(scrollPercent);

//       // Show progress bar if the user has started scrolling
//       setIsScrolling(currentScroll > 0);

//       // Show back to top button after scrolling down 300px
//       setShowBackToTop(currentScroll > 300);
//     };

//     window.addEventListener('scroll', handleScroll);

//     // Cleanup listener on component unmount
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const handleBackToTop = () => {
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   return (
//     <div className="relative">
//       {/* Scroll Progress Bar */}
//       <div
//         className={`fixed top-0 left-0 w-full h-1 bg-gray-200 z-50 transition-opacity duration-300 ${isScrolling ? 'opacity-100' : 'opacity-0'}`}
//       >
//         <div
//           className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 ease-out"
//           style={{ width: `${scrollProgress}%` }}
//         ></div>
//       </div>

//       {/* Back to Top Button */}
//       {showBackToTop && (
//         <motion.div
//           className="fixed bottom-10 right-10 z-50"
//           initial={{ opacity: 0, scale: 0.5 }}
//           animate={{ opacity: 1, scale: 1 }}
//           exit={{ opacity: 0, scale: 0.5 }}
//           transition={{ type: 'spring', stiffness: 150, damping: 20 }}
//         >
//           <motion.button
//             onClick={handleBackToTop}
//             className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 relative"
//             whileHover={{ scale: 1.1, rotate: [0, 10, -10, 0] }}
//             whileTap={{ scale: 0.9 }}
//             style={{
//               boxShadow: '0px 8px 15px rgba(0, 0, 255, 0.3)',
//               position: 'relative',
//             }}
//           >
//             <FaArrowUp size={20} />
//             <motion.div
//               className="absolute inset-0 rounded-full"
//               style={{
//                 border: '2px solid rgba(0, 0, 255, 0.5)',
//                 animation: 'pulse 2s infinite',
//               }}
//               animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
//             ></motion.div>
//           </motion.button>
//         </motion.div>
//       )}

//       <div className="mx-10 md:mx-20 mt-8 mb-8">
//         <h1 className="text-3xl text-center font-bold mb-4">Blogging Website</h1>

//         <div className="flex flex-col md:flex-row gap-8">
//           {/* Main Posts Section */}
//           <div className="flex-1">
//             {posts.map(post => (
//               <div
//                 key={post._id}
//                 className="border p-4 mb-4 shadow-md rounded-md"
//               >
//                 {post.image && (
//                   <div className="shadow-sm">
//                     <img src={post.image} alt="Blog post" className="mt-2 max-w-full" />
//                   </div>
//                 )}
//                 <h2 className="text-xl font-bold">{post.title}</h2>
//                 <div dangerouslySetInnerHTML={{ __html: post.content.substring(0, 150) + '...' }} />
//                 <p className="text-sm text-gray-500 mt-2">Author: {post.author}</p>
//                 <p className="text-sm text-gray-500 mb-2">Created Date: {new Date(post.created_date).toLocaleDateString()}</p>
//                 <Link to={`/view/${post._id}`}>
//                   <Button variant='contained'>View Post</Button>
//                 </Link>
//               </div>
//             ))}
//           </div>

//           {/* Recent Posts Section */}
//           <div className="w-full md:w-1/4 md:sticky top-8 h-max">
//             <h2 className="text-xl font-bold mb-4">Recent Posts</h2>
//             {recentPosts.map(post => (
//               <div key={post._id} className="border p-4 mb-4 shadow-md rounded-md">
//                 <h3 className="text-lg font-bold">{post.title}</h3>
//                 <p className="text-sm text-gray-500">Author: {post.author}</p>
//                 <p className="text-sm text-gray-500">Date: {new Date(post.created_date).toLocaleDateString()}</p>
//                 <Link to={`/view/${post._id}`}>
//                   <Button variant='outlined' size="small">Read More</Button>
//                 </Link>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HomePage;

import React, { useState, useEffect } from 'react';
import postService from '../service/postService';
import PostCard from '../components/postCard';
import RecentPosts from '../components/recentPosts';
import ScrollProgressBar from '../components/scrollProgressBar';
import BackToTopButton from '../components/backToTop';

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [recentPosts, setRecentPosts] = useState([]);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    // Fetch posts and recent posts
    postService.fetchPosts()
      .then(data => {
        setPosts(data);
        setRecentPosts(data.slice(0, 3));
      })
      .catch(error => console.error('Error fetching posts:', error));

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
  }, []);

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative">
      <ScrollProgressBar scrollProgress={scrollProgress} isScrolling={isScrolling} />
      <BackToTopButton showBackToTop={showBackToTop} handleBackToTop={handleBackToTop} />

      <div className="mx-10 md:mx-20 mt-8 mb-8">
        <h1 className="text-3xl text-center font-bold mb-4">Blogging Website</h1>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1">
            {posts.map(post => <PostCard key={post._id} post={post} />)}
          </div>

          <RecentPosts recentPosts={recentPosts} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
