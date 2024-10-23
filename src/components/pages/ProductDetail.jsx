import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3001/products/${id}`)
      .then(response => response.json())
      .then(data => setProduct(data))
      .catch(error => console.error('Error fetching product:', error));
  }, [id]);

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
          {product.price}
        </span>
      </div>
    </div>
  );
};

export default ProductDetail;