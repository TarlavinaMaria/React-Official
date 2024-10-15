import React, { useEffect } from 'react';

// Уведомление, которое исчезает через 3 секунды после отображения

const Alert = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // Уведомление исчезает через 3 секунды

    return () => clearTimeout(timer); // Очистка таймера при размонтировании
  }, [onClose]);

  return (
    <div className="fixed top-4 right-4 bg-green-500 text-white p-4 rounded shadow-lg transition-opacity duration-300">
      {message}
    </div>
  );
};

export default Alert;