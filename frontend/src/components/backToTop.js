import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowUp } from 'react-icons/fa';

const BackToTopButton = ({ showBackToTop, handleBackToTop }) => (
    showBackToTop && (
        <motion.div
            className="fixed bottom-10 right-10 z-50"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ type: 'spring', stiffness: 150, damping: 20 }}
        >
            <motion.button
                onClick={handleBackToTop}
                className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 relative"
                whileHover={{ scale: 1.1, rotate: [0, 10, -10, 0] }}
                whileTap={{ scale: 0.9 }}
                style={{
                    boxShadow: '0px 8px 15px rgba(0, 0, 255, 0.3)',
                    position: 'relative',
                }}
            >
                <FaArrowUp size={20} />
                <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{
                        border: '2px solid rgba(0, 0, 255, 0.5)',
                        animation: 'pulse 2s infinite',
                    }}
                    animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
                ></motion.div>
            </motion.button>
        </motion.div>
    )
);

export default BackToTopButton;
