import { create } from "zustand";

/**
 * Стор для управления состоянием корзины.
 */
const useCartStore = create((set) => ({
  cart: [], // Определяем начальное состояние корзины как пустой массив. Этот массив будет хранить объекты товаров, добавленных в корзину.
  addToCart: (product) => {
    // Функция для добавления товара в корзину
    set((state) => {
      const existingProduct = state.cart.find(item => item.id === product.id); // Проверяем, есть ли уже товар с таким id в корзине
      if (existingProduct) {
        // Если товар уже в корзине, увеличиваем его количество
        return {
          cart: state.cart.map(item =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        };
      }
      // Если товара нет в корзине, добавляем его
      return { cart: [...state.cart, { ...product, quantity: 1 }] };
    });
  },
  removeFromCart: (productId) => {
    set((state) => ({
      cart: state.cart.filter(item => item.id !== productId),
    }));
  },
}));

export default useCartStore;