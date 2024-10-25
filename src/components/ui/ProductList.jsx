import React, { useEffect, useState } from 'react';
import Card from '../pages/Card';

/**
 * Компонент ProductList отображает список товаров.
 * @returns JSX.Element
 */

const ProductList = () => {
  // Используем хук useState для хранения данных о товарах и ошибке.
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null); // Строка, которая будет содержать сообщение об ошибке, если запрос к серверу не удался

  // Используем хук useEffect для выполнения запроса к серверу при монтировании компонента. 
  useEffect(() => {
    fetch('http://localhost:3001/products')
      .then(response => {
        // Если ответ от сервера не успешный (response.ok равно false), мы выбрасываем ошибку с сообщением 
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        // Если ответ успешный, мы преобразуем его в JSON 
        return response.json();
      })
      // Сохраняем в состояние products с помощью функции
      .then(data => setProducts(data))
      // Если возникает ошибка, мы перехватываем ее с помощью .catch и сохраняем сообщение об ошибке в состояние error
      .catch(error => setError(error.message));
  }, []);

  // Если в состоянии error есть значение (то есть произошла ошибка при запросе), отображаем сообщение об ошибке.
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
      {products.map(product => (
        <Card
          key={product.id}
          id={product.id}
          imageSrc={product.imageSrc}
          title={product.title}
          description={product.description}
          rating={product.rating}
          reviewCount={product.reviewCount}
          price={product.price}
        />
      ))}
    </div>
  );
};

export default ProductList;