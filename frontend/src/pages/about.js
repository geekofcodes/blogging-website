import React, { useState, useEffect } from "react";
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";
import { motion } from "framer-motion";
import logoImg from "../assets/images/logo/logo_new.png";
import ScrollProgressBar from "../components/scrollProgressBar";
import BackToTopButton from "../components/backToTop";

const AboutPage = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Animation variants for text and images
  const textVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const iconVariant = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeInOut" },
    },
  };

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    document.title = "About - Apex Archives"; // Change tab title

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
    <React.Fragment>
      <motion.div
        className="container mx-auto mt-8 mb-8"
        initial="hidden"
        animate="visible"
        variants={textVariant}
      >
        <ScrollProgressBar
          scrollProgress={scrollProgress}
          isScrolling={isScrolling}
        />
        <BackToTopButton
          showBackToTop={showBackToTop}
          handleBackToTop={handleBackToTop}
        />
        <motion.h1
          className="text-3xl font-bold mb-4 px-20"
          variants={textVariant}
        >
          About Apex Archives
        </motion.h1>

        <div
          className="flex justify-center items-center" // Ensures the logo stays centered
          variants={textVariant}
          whileHover={{ scale: 1.1 }} // Slight scaling on hover
        >
          <img
            src={logoImg} // Replace with your logo
            alt="Apex Archives Logo"
            className="rounded-full"
            style={{ width: "200px", height: "auto" }} // Set fixed width and auto height
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        </div>

        <motion.p className="text-lg mb-4 px-20" variants={textVariant}>
          Welcome to Apex Archives, your ultimate destination for compelling and
          thought-provoking blog posts. Our platform is where creativity and
          storytelling unite, providing a stage for writers, creators, and
          readers alike to share their ideas, opinions, and inspirations.
        </motion.p>

        <motion.h2
          className="text-2xl font-bold mb-4 px-20"
          variants={textVariant}
        >
          Our Story
        </motion.h2>
        <motion.p className="text-lg mb-4 px-20" variants={textVariant}>
          Founded in 2024, Apex Archives was born out of a desire to create a
          space where voices from all walks of life can be heard. Our founders
          recognized the need for a blogging platform that fosters diversity of
          thought and encourages meaningful discussions across a wide range of
          topics, from technology and business to culture and lifestyle.
        </motion.p>

        <motion.h2
          className="text-2xl font-bold mb-4 px-20"
          variants={textVariant}
        >
          Our Mission
        </motion.h2>
        <motion.p className="text-lg mb-4 px-20" variants={textVariant}>
          Our mission is to empower writers and creatives to express themselves
          freely and authentically. We believe that every story has the
          potential to inspire, challenge, or transform perspectives. At Apex
          Archives, we aim to build a vibrant community of readers and writers
          who contribute to the exchange of knowledge and ideas.
        </motion.p>

        <motion.h2
          className="text-2xl font-bold mb-4 px-20"
          variants={textVariant}
        >
          What We Offer
        </motion.h2>
        <motion.p className="text-lg mb-4 px-20" variants={textVariant}>
          Apex Archives is more than just a blogging platform. We offer:
        </motion.p>
        <motion.ul
          className="list-disc list-inside text-lg mb-4 px-24"
          variants={textVariant}
        >
          <li>
            A diverse range of articles on technology, culture, business,
            health, and more.
          </li>
          <li>
            A platform for aspiring writers to showcase their work and build an
            audience.
          </li>
          <li>
            Interactive features that allow readers to engage with content,
            leave comments, and share articles across social media.
          </li>
          <li>
            Monthly newsletters that highlight our most popular and impactful
            posts.
          </li>
        </motion.ul>

        <motion.h2
          className="text-2xl font-bold mb-4 px-20"
          variants={textVariant}
        >
          Our Vision
        </motion.h2>
        <motion.p className="text-lg mb-4 px-20" variants={textVariant}>
          At Apex Archives, we envision a future where everyone has a voice and
          where ideas flow freely across borders and cultures. As we grow, we
          plan to expand our reach and impact by providing more tools and
          resources for writers to improve their craft and for readers to
          discover new and exciting perspectives.
        </motion.p>

        <motion.h2
          className="text-2xl font-bold mb-4 px-20"
          variants={textVariant}
        >
          Meet the Team
        </motion.h2>
        <motion.p className="text-lg mb-4 px-20" variants={textVariant}>
          Our small but passionate team is dedicated to curating the best
          content for our readers. From our founders to our editors, we all
          share a common goal: to create a platform that celebrates creativity
          and inspires curiosity.
        </motion.p>

        <motion.p className="text-lg mb-4 px-20" variants={textVariant}>
          Whether you’re a writer with a story to tell or a reader seeking fresh
          insights, Apex Archives welcomes you to be part of our growing
          community.
        </motion.p>

        <motion.div
          className="flex items-center justify-center space-x-4 mt-8"
          initial="hidden"
          animate="visible"
        >
          <motion.a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            variants={iconVariant}
            whileHover={{ scale: 1.2, rotate: 10 }}
          >
            <FaGithub className="text-3xl text-gray-700 hover:text-gray-900" />
          </motion.a>
          <motion.a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            variants={iconVariant}
            whileHover={{ scale: 1.2, rotate: 10 }}
          >
            <FaTwitter className="text-3xl text-blue-500 hover:text-blue-700" />
          </motion.a>
          <motion.a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            variants={iconVariant}
            whileHover={{ scale: 1.2, rotate: 10 }}
          >
            <FaLinkedin className="text-3xl text-indigo-500 hover:text-indigo-700" />
          </motion.a>
        </motion.div>
      </motion.div>
    </React.Fragment>
  );
};

export default AboutPage;
