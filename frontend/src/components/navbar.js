import React from "react";
import { Link, useLocation } from "react-router-dom/cjs/react-router-dom";

const Navbar = () => {
  const location = useLocation(); // Get the current route to highlight active link

  return (
    <React.Fragment>
      <nav className="bg-gradient-to-r from-purple-600 to-blue-500 shadow-lg px-20 py-4">
        <div className="container mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="text-white text-2xl font-bold tracking-wide hover:text-gray-300 transition duration-300"
          >
            Apex Archives
          </Link>

          {/* Navigation Links */}
          <div className="space-x-8">
            <Link
              to="/"
              className={`text-white hover:text-gray-300 transition duration-300 ${
                location.pathname === "/" ? "border-b-2 border-white" : ""
              }`}
            >
              Home
            </Link>
            <Link
              to="/upload"
              className={`text-white hover:text-gray-300 transition duration-300 ${
                location.pathname === "/upload" ? "border-b-2 border-white" : ""
              }`}
            >
              Upload Blog
            </Link>
            <Link
              to="/about"
              className={`text-white hover:text-gray-300 transition duration-300 ${
                location.pathname === "/about" ? "border-b-2 border-white" : ""
              }`}
            >
              About
            </Link>
          </div>
        </div>
      </nav>
    </React.Fragment>
  );
};

export default Navbar;


