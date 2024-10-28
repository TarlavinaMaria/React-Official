import React, { useEffect, useState } from 'react';
import ProductModal from "../ui/ProductModal";

/**
 * Компонент AdminPage для отображения страницы администратора
 * @returns JSX.Element
 */

const AdminPage = () => {
  const [products, setProducts] = useState([]); // Массив, который будет содержать данные о продуктах
  const [loading, setLoading] = useState(true); // Флаг, указывающий, загружаются ли данные
  const [error, setError] = useState(null); // Состояние для хранения ошибок, если они возникнут
  const [isModalOpen, setIsModalOpen] = useState(false); // Флаг, указывающий, открыто ли модальное окно
  const [modalAction, setModalAction] = useState('add'); // Строка, указывающая, какое действие будет выполняться в модальном окне (add, edit, delete)
  const [selectedProduct, setSelectedProduct] = useState(null); // Объект, содержащий данные о выбранном продукте для редактирования или удаления

  useEffect(() => {
    // Запрос к серверу для получения данных о товарах
    fetch("http://localhost:3001/orders")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const handleAddProduct = (newProduct) => {
    // Отправка POST-запроса на сервер для добавления нового товара
    fetch("http://localhost:3001/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Обновление списка товаров после успешного добавления
        setProducts([...products, data]);
      })
      .catch((error) => {
        console.error("Error adding product:", error);
      });
  };

  const handleEditProduct = (updatedProduct) => {
    // Отправка PUT-запроса на сервер для обновления товара
    fetch(`http://localhost:3001/orders/${updatedProduct.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Обновление списка товаров после успешного обновления
        setProducts(products.map((product) => (product.id === data.id ? data : product)));
      })
      .catch((error) => {
        console.error("Error updating product:", error);
      });
  };

  const handleDeleteProduct = (productId) => {
    // Отправка DELETE-запроса на сервер для удаления товара
    fetch(`http://localhost:3001/orders/${productId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        // Обновление списка товаров после успешного удаления
        setProducts(products.filter((product) => product.id !== productId));
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
      });
  };
  // 
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded-md w-full">
        <div className="flex justify-between items-center mt-6 mb-4 p-4">
          <h2 className="text-xl font-bold">Products</h2>
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              setSelectedProduct(null);
              setModalAction('add');
              setIsModalOpen(true);
            }}
          >
            Add Product
          </button>
        </div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rating
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Review Count
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product.id}>
                <td className="px-6 py-4 whitespace-nowrap">{product.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{product.title}</td>
                <td className="px-6 py-4">{product.description}</td>
                <td className="px-6 py-4 whitespace-nowrap">{product.price}</td>
                <td className="px-6 py-4 whitespace-nowrap">{product.rating}</td>
                <td className="px-6 py-4 whitespace-nowrap">{product.reviewCount}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => {
                      setSelectedProduct(product);
                      setModalAction('edit');
                      setIsModalOpen(true);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
                    onClick={() => {
                      setSelectedProduct(product);
                      setModalAction('delete');
                      setIsModalOpen(true);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        action={modalAction}
        product={selectedProduct}
        onAddProduct={handleAddProduct}
        onEditProduct={handleEditProduct}
        onDeleteProduct={handleDeleteProduct}
      />
    </div>
  );
};

export default AdminPage;