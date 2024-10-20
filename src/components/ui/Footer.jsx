import React from 'react';

/**
 * Компонент подвала. Выводит стандарный текст и год.
 * @returns JSX
 */

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