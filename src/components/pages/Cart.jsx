import React, { useState } from "react";
import useCartStore from "../../store/useCartStore"; // Импортируем Zustand стор
import { LiaTimesSolid } from "react-icons/lia";
import Alert from "../ui/Alert"; // Импортируем компонент Alert
import Checkout from "./Checkout"; // Импортируем компонент Checkout


/**
 * Компонент Cart отображает товары, которые находятся в корзине, и позволяет управлять ими.
 * @returns JSX.Element
 */


const Cart = () => {
  const cart = useCartStore((state) => state.cart); // Получаем товары из корзины
  const removeFromCart = useCartStore((state) => state.removeFromCart); // Получаем функцию удаления товара из корзины
  const increaseQuantity = useCartStore((state) => state.increaseQuantity); // Получаем функцию увеличения количества товара
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity); // Получаем функцию уменьшения количества товара
  const [alertMessage, setAlertMessage] = useState(""); // Состояние для уведомления
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false); // Состояние для открытия формы оплаты

  // Функция вызывается при нажатии на кнопку удаления товара. Она удаляет товар из корзины
  const handleRemoveFromCart = (productId, title) => {
    removeFromCart(productId); // Удаляем товар из корзины
    setAlertMessage(`${title} deleted!`); // Уведомление пользователя
  };
  // Функция вызывается при закрытии уведомления. Она сбрасывает состояние alertMessage в пустую строку, что скрывает уведомление
  const handleCloseAlert = () => {
    setAlertMessage("");
  };
  // Используем метод reduce для массива cart, чтобы рассчитать общую стоимость всех товаров в корзине. Мы преобразуем цену и количество товара в числа и суммируем их
  const totalPrice = cart.reduce((total, item) => {
    const itemPrice = parseFloat(item.price);
    const itemQuantity = parseInt(item.quantity, 10);
    return total + (isNaN(itemPrice) ? 0 : itemPrice) * (isNaN(itemQuantity) ? 0 : itemQuantity);
  }, 0);

  return (
    <section className="cart min-h-screen p-4 bg-gray-50">
      <h2 className="text-4xl font-bold mb-6 text-center">Basket</h2>
      {cart.length === 0 ? (
        <p className="text-center text-lg text-gray-500">The basket is empty</p>
      ) : (
        <>
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
                <div className="flex items-center mt-2">
                  <button
                    onClick={() => decreaseQuantity(item.id)}
                    className="bg-gray-200 text-gray-700 px-2 py-1 rounded-l hover:bg-gray-300"
                  >
                    -
                  </button>
                  <span className="bg-gray-100 text-gray-700 px-4 py-1">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => increaseQuantity(item.id)}
                    className="bg-gray-200 text-gray-700 px-2 py-1 rounded-r hover:bg-gray-300"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 text-right">
            <span className="text-2xl font-bold">Total: {totalPrice.toFixed(2)}$</span>
          </div>
          <div className="mt-6 text-center">
            <button
              onClick={() => setIsCheckoutOpen(true)}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              Оплатить
            </button>
          </div>
        </>
      )}
      {alertMessage && (
        <Alert message={alertMessage} onClose={handleCloseAlert} />
      )}
      {isCheckoutOpen && (
        <Checkout onClose={() => setIsCheckoutOpen(false)} />
      )}
    </section>
  );
};

export default Cart;