import axios from 'axios';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useQuery } from '@tanstack/react-query';

const fetchItems = async () => {
  const { data } = await axios.get("http://localhost:5000/items");
  return data;
};

const Shop = () => {
  const {
    data: items = [],
    isLoading: isLoadingItems,
    isError: isErrorItems,
    error: errorItems,
  } = useQuery({
    queryKey: ["items"],
    queryFn: fetchItems,
  });

  const [cart, setCart] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  if (isLoadingItems) return <p>Loading...</p>;

  if (isErrorItems)
    return (
      <p>
        Error: {errorItems?.message || "Something went wrong"}
      </p>
    );

  const handleAddToCart = (item) => {
    setCart([...cart, item]);
  };

  const handleShowDetails = (item) => {
    setSelectedItem(item);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
  };

  return (
    <div>
      <div className="mt-20 container mx-auto">
        <Helmet>
          <title>MediCard | Shop</title>
        </Helmet>
        <h2 className="text-2xl font-bold mb-5 text-center">Shop - All Medicines</h2>

        {/* Medicines Table */}
        <table className="min-w-full border-collapse border border-gray-200">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Image</th>
              <th className="border border-gray-300 p-2">Name</th>
              <th className="border border-gray-300 p-2">Price</th>
              <th className="border border-gray-300 p-2">Discount</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td className="border border-gray-300 p-2">
                  <img src={item.imgaurl} alt={item.itemName} className="w-20 h-20 object-cover" />
                </td>
                <td className="border border-gray-300 p-2">{item.itemName}</td>
                <td className="border border-gray-300 p-2">${item.price}</td>
                <td className="border border-gray-300 p-2">{item.discount}$</td>
                <td className="border border-gray-300 p-2">
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                  >
                    Select
                  </button>
                  <button
                    onClick={() => handleShowDetails(item)}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    Eye
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Cart Details */}
        <div className="mt-5">
          <h3 className="text-xl font-bold">Cart ({cart.length} items)</h3>
          <ul>
            {cart.map((item, index) => (
              <li key={index} className="my-2">
                {item.itemName} - ${item.price}
              </li>
            ))}
          </ul>
        </div>

        {/* Item Details Modal */}
        {selectedItem && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h3 className="text-2xl font-bold mb-4">{selectedItem.itemName}</h3>
              <img src={selectedItem.imgaurl} alt={selectedItem.itemName} className="w-[400px] h-[300px]  mb-4 mx-auto" />
              <p className="mb-2">Price: ${selectedItem.price}</p>
              <p className="mb-2">Discount: {selectedItem.discount}%</p>
              <p className="mb-4">Description: {selectedItem.description}</p>
              <button
                onClick={handleCloseModal}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
