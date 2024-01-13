import React from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom'

const Navbar = () => {
  return (
    <React.Fragment>
        <nav className="bg-gray-800 px-20 py-4">
            <div className="container mx-auto flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="text-white text-xl font-bold">Apex Archives</Link>

                {/* Navigation Links */}
                <div className="space-x-4">
                    <Link to="/" className="text-white">Home</Link>
                    <Link to="/upload" className="text-white">Upload Blog</Link>
                    <Link to="/about" className="text-white">About</Link>
                </div>
            </div>
        </nav>
    </React.Fragment>
  )
}

export default Navbar

