import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Компонент карточки товара. Через props принимает параметры карточки и выводит их в виде JSX элемента.
 * @param { id, imageSrc, title, description, rating, reviewCount, price } - Параметры карточки. А имено ID, изображение, название, описание, рейтинг, количество отзывов и цена.
 * @returns JSX элемент.
 */

const Card = ({ id, imageSrc, title, description, rating, reviewCount, price }) => {
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
      </div>
    </div>
  );
};

export default Card;