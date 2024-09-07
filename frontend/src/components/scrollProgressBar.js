import React from 'react';

const ScrollProgressBar = ({ scrollProgress, isScrolling }) => (
    <div
        className={`fixed top-0 left-0 w-full h-1 bg-gray-200 z-50 transition-opacity duration-300 ${isScrolling ? 'opacity-100' : 'opacity-0'}`}
    >
        <div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 ease-out"
            style={{ width: `${scrollProgress}%` }}
        ></div>
    </div>
);

export default ScrollProgressBar;
