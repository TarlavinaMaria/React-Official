import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useCartStore from "../../store/useCartStore"; // Импортируем Zustand стор
import Alert from "../ui/Alert"; // Импортируем компонент Alert

/**
 * Компонент ProductDetail отображает детали продукта по его ID.
 * @returns JSX.Element
 */

const ProductDetail = () => {
  const { id } = useParams(); // Получаем ID продукта из URL
  const [product, setProduct] = useState(null); // Состояние для продукта
  const [error, setError] = useState(null); // Строка, которая будет содержать сообщение об ошибке, если запрос к серверу не удался
  const [alertMessage, setAlertMessage] = useState(""); // Состояние для уведомления
  const addToCart = useCartStore((state) => state.addToCart); // Получаем функцию добавления товара в корзину

  // Используем хук useEffect для выполнения запроса к серверу при монтировании компонента.
  useEffect(() => {
    fetch(`http://localhost:3001/products/${id}`)
      .then((response) => {
        // Если ответ от сервера не успешный (response.ok равно false), мы выбрасываем ошибку с сообщением
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        // Если ответ успешный, мы преобразуем его в JSON
        return response.json();
      })
      // Сохраняем в состояние products с помощью функции
      .then((data) => setProduct(data))
      // Если возникает ошибка, мы перехватываем ее с помощью .catch и сохраняем сообщение об ошибке в состояние error
      .catch((error) => setError(error.message));
  }, [id]);

  // Функция добавляет продукт в корзину, вызывается при нажатии на кнопку "Add to cart" и отображает уведомление пользователю
  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      setAlertMessage(`${product.title} added to cart!`); // Уведомление пользователя
    }
  };
  // Функция вызывается при закрытии уведомления. Она сбрасывает состояние alertMessage в пустую строку, что скрывает уведомление
  const handleCloseAlert = () => {
    setAlertMessage(""); // Скрываем уведомление
  };
  // Если в состоянии error есть значение (то есть произошла ошибка при запросе), отображаем сообщение об ошибке
  if (error) {
    return <div>Error: {error}</div>;
  }
  // Если продукт еще не загружен, отображаем сообщение
  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{product.title}</h1>
      <img
        src={product.imageSrc}
        alt={product.title}
        className="h-64 object-cover mb-4"
      />
      <p className="text-gray-700 mb-4">{product.description}</p>
      <div className="mb-4">
        <span className="text-yellow-500">Rating: {product.rating}</span>
        <span className="text-gray-500 ml-2">
          ({product.reviewCount} reviews)
        </span>
      </div>
      <div>
        <span className="text-green-600 font-bold text-lg">
          {product.price}$
        </span>
      </div>
      <button
        onClick={handleAddToCart}
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        Add to cart
      </button>
      {alertMessage && (
        <Alert message={alertMessage} onClose={handleCloseAlert} />
      )}
    </div>
  );
};

export default ProductDetail;
