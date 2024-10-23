import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useCartStore from "../../store/useCartStore"; // Импортируем Zustand стор
import Alert from "../ui/Alert"; // Импортируем компонент Alert

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [alertMessage, setAlertMessage] = useState(""); // Состояние для уведомления
  const addToCart = useCartStore((state) => state.addToCart); // Получаем функцию добавления товара в корзину

  useEffect(() => {
    fetch(`http://localhost:3001/products/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setProduct(data))
      .catch(error => setError(error.message));
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      setAlertMessage(`${product.title} added to cart!`); // Уведомление пользователя
    }
  };

  const handleCloseAlert = () => {
    setAlertMessage(""); // Скрываем уведомление
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

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