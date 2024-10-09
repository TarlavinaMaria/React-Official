import React from 'react';
import { useParams } from 'react-router-dom';
import productsData from '../data/products.json';

const ProductDetail = () => {
  const { id } = useParams();
  const product = productsData.find(p => p.id === parseInt(id));

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{product.title}</h1>
      <img src={product.imageSrc} alt={product.title} className="h-64 object-cover mb-4" />
      <p className="text-gray-700 mb-4">{product.description}</p>
      <div className="mb-4">
        <span className="text-yellow-500">Rating: {product.rating}</span>
        <span className="text-gray-500 ml-2">({product.reviewCount} reviews)</span>
      </div>
      <div>
        <span className="text-green-600 font-bold text-lg">{product.price}</span>
      </div>
    </div>
  );
};

export default ProductDetail;