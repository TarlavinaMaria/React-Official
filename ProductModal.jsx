import React, { useState, useEffect } from 'react';

/**
 * Компонент ProductModal для отображения модального окна с формой добавления/редактирования продукта
 * @returns JSX.Element
 */

const ProductModal = ({ isOpen, onClose, action, product, onAddProduct, onEditProduct, onDeleteProduct }) => {
  // Обьявление состояний для формы
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [rating, setRating] = useState('');
  const [reviewCount, setReviewCount] = useState('');

  useEffect(() => {
    // Обновление состояний формы при изменении действия или продукта,
    // при добавлении продукта сбрасываем значения формы,
    // при редактировании продукта заполняем поля данными продукта
    if (action === 'edit' && product) {
      setTitle(product.title);
      setDescription(product.description);
      setPrice(product.price);
      setRating(product.rating);
      setReviewCount(product.reviewCount);
    } else {
      // В случае удаления продукта сбрасываем значения формы
      resetForm();
    }
  }, [action, product]);

  const handleSubmit = (e) => {
    // Обработка отправки формы при добавлении или редактировании продукта
    e.preventDefault();
    if (action === 'add') {
      const newProduct = {
        title,
        description,
        price: parseFloat(price),
        rating: parseFloat(rating),
        reviewCount: parseInt(reviewCount, 10),
      };
      onAddProduct(newProduct);
    } else if (action === 'edit') {
      const updatedProduct = {
        ...product,
        title,
        description,
        price: parseFloat(price),
        rating: parseFloat(rating),
        reviewCount: parseInt(reviewCount, 10),
      };
      onEditProduct(updatedProduct);
    }
    // Закрытие модального окна и сброс значений формы
    onClose();
  };

  const handleDelete = () => {
    // Обработка удаления продукта
    onDeleteProduct(product.id);
    onClose();
  };

  const resetForm = () => {
    // Сброс значений формы
    setTitle('');
    setDescription('');
    setPrice('');
    setRating('');
    setReviewCount('');
  };

  if (!isOpen) return null; // Возвращаем null, если модальное окно не открыто

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        {action === 'delete' ? (
          <>
            <h2 className="text-xl font-bold mb-4">Delete Product</h2>
            <p className="mb-4">Are you sure you want to delete this product?</p>
            <div className="flex justify-end">
              <button
                type="button"
                className="bg-gray-500 text-white py-2 px-4 rounded mr-2"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="button"
                className="bg-red-500 text-white py-2 px-4 rounded"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-xl font-bold mb-4">{action === 'add' ? 'Add New Product' : 'Edit Product'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2" htmlFor="title">
                  Title
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2" htmlFor="description">
                  Description
                </label>
                <textarea
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2" htmlFor="price">
                  Price
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="price"
                  type="number"
                  step="0.01"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2" htmlFor="rating">
                  Rating
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="rating"
                  type="number"
                  step="0.1"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2" htmlFor="reviewCount">
                  Review Count
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="reviewCount"
                  type="number"
                  value={reviewCount}
                  onChange={(e) => setReviewCount(e.target.value)}
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-gray-500 text-white py-2 px-4 rounded mr-2"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded"
                >
                  {action === 'add' ? 'Add Product' : 'Save Changes'}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductModal;