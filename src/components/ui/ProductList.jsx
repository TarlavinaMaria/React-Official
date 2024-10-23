import React, { useEffect, useState } from 'react';
import Card from '../pages/Card';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/products')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

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