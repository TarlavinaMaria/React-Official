import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useCartStore from '../store/useCartStore'; // Импортируем Zustand стор
import Alert from './Alert'; // Импортируем компонент Alert

const Card = ({ id, imageSrc, title, description, rating, reviewCount, price }) => {
  const addToCart = useCartStore((state) => state.addToCart); // Получаем функцию добавления товара в корзину
  const [alertMessage, setAlertMessage] = useState(''); // Состояние для уведомления

  const handleAddToCart = () => {
    addToCart({ id, imageSrc, title, description, rating, reviewCount, price });
    setAlertMessage(`${title} added to cart!`); // Уведомление пользователя
  };

  const handleCloseAlert = () => {
    setAlertMessage(''); // Скрываем уведомление
  };

  return (
    <div className="max-w-xs rounded overflow-hidden shadow-lg">
      <img className="w-full h-48 object-cover" src={imageSrc} alt={title} />
      <div className="px-4 py-2">
        <Link to={`/products/${id}`} className="font-bold text-lg mb-2 hover:underline">
          {title}
        </Link>
        <p className="text-gray-700 text-sm line-clamp-3">{description}</p>
        <div className="mt-2">
          <span className="text-yellow-500 text-sm">Rating: {rating}</span>
          <span className="text-gray-500 text-sm ml-2">({reviewCount} reviews)</span>
        </div>
        <div className="mt-2">
          <span className="text-green-600 font-bold text-lg">{price}</span>
        </div>
        <button 
          onClick={handleAddToCart} 
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Add to cart
        </button>
      </div>
      {alertMessage && (
        <Alert message={alertMessage} onClose={handleCloseAlert} />
      )}
    </div>
  );
};

export default Card;