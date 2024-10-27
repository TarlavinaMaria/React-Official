import React, { useState } from 'react';

const ProductModal = ({ isOpen, onClose, onAddProduct }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [rating, setRating] = useState('');
  const [reviewCount, setReviewCount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = {
      title,
      description,
      price: parseFloat(price),
      rating: parseFloat(rating),
      reviewCount: parseInt(reviewCount, 10),
    };
    onAddProduct(newProduct);
    resetForm(); // Сбрасываем форму после отправки данных
    onClose();
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setPrice('');
    setRating('');
    setReviewCount('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Add New Product</h2>
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
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;