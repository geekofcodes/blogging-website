import React from 'react';
import MadeWithLove from 'react-made-with-love';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white px-10 md:px-20 py-4">
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between">
        <p className="text-lg font-bold">Apex Archives</p>
        <p className="text-sm">&copy; {currentYear} Apex Archives. All rights reserved.</p>
        <p className="text-sm mt-2 lg:mt-0"><MadeWithLove by="Geek of Codes" emoji /></p>
      </div>
    </footer>
  );
};

export default Footer;
