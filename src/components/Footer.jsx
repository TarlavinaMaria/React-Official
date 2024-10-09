import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-4 text-center">
      <p className="text-sm">
        This is a training project. All rights reserved &copy; {new Date().getFullYear()}
      </p>
    </footer>
  );
};

export default Footer;