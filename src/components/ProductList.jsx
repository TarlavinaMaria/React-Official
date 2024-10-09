import React from 'react';
import Card from './Card';
import productsData from '../data/products.json';

const ProductList = () => {
  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
      {productsData.map(product => (
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