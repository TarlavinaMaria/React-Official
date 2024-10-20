import React, { useState } from "react";
import useCartStore from "../../store/useCartStore"; // Импортируем Zustand стор
import { LiaTimesSolid } from "react-icons/lia";
import Alert from "../ui/Alert"; // Импортируем компонент Alert

const Cart = () => {
  const cart = useCartStore((state) => state.cart); // Получаем товары из корзины
  const removeFromCart = useCartStore((state) => state.removeFromCart); // Получаем функцию удаления товара из корзины
  const [alertMessage, setAlertMessage] = useState(""); // Состояние для уведомления

  const handleRemoveFromCart = (productId, title) => {
    removeFromCart(productId); // Удаляем товар из корзины
    setAlertMessage(`${title} deleted!`); // Уведомление пользователя
  };

  const handleCloseAlert = () => {
    setAlertMessage(""); // Скрываем уведомление
  };

  return (
    <section className="cart min-h-screen p-4 bg-gray-50">
      <h2 className="text-4xl font-bold mb-6 text-center">Basket</h2>
      {cart.length === 0 ? (
        <p className="text-center text-lg text-gray-500">The basket is empty</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="border rounded-lg shadow-lg p-4 bg-white relative"
            >
              <button
                onClick={() => handleRemoveFromCart(item.id, item.title)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700 transition duration-200"
                aria-label={`Удалить ${item.title} из корзины`}
              >
                <LiaTimesSolid size={20} />
              </button>
              <img
                src={item.imageSrc}
                alt={item.title}
                className="w-full h-48 object-cover mb-4 rounded"
              />
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600 mb-2">{item.description}</p>
              <span className="text-green-600 font-bold text-lg">
                {item.price}$
              </span>
              <p className="text-gray-500 mt-1">Count: {item.quantity}</p>
            </div>
          ))}
        </div>
      )}
      {alertMessage && (
        <Alert message={alertMessage} onClose={handleCloseAlert} />
      )}
    </section>
  );
};

export default Cart;
