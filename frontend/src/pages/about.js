import React from 'react';
import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { Tilt } from 'react-tilt';

const AboutPage = () => {
  return (
    <React.Fragment>
        <div className="container mx-auto mt-8">
            <h1 className="text-3xl font-bold mb-4">About Apex Archives</h1>

            <Tilt className="Tilt" options={{ max: 25, scale: 1.05 }}>
                <div className="Tilt-inner">
                <img
                    src="path-to-your-logo.png" // Replace with your logo
                    alt="Apex Archives Logo"
                    className="rounded-full max-w-xs mx-auto mb-8"
                />
                </div>
            </Tilt>

            <p className="text-lg mb-4">
                Welcome to Apex Archives, your go-to destination for captivating and insightful blog posts.
            </p>

            <p className="text-lg mb-4">
                Our mission is to provide a platform where writers and readers converge, sharing ideas and stories that inspire.
            </p>

            <p className="text-lg mb-4">
                Connect with us on social media to stay updated on the latest articles and join the Apex Archives community.
            </p>

            <div className="flex items-center justify-center space-x-4 mt-8">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                <FaGithub className="text-3xl text-gray-700 hover:text-gray-900" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <FaTwitter className="text-3xl text-blue-500 hover:text-blue-700" />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <FaLinkedin className="text-3xl text-indigo-500 hover:text-indigo-700" />
                </a>
            </div>
        </div>
    </React.Fragment>
  );
};

export default AboutPage;
