import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// Function to fetch items from a specific category
const fetchCategoryItems = async (category) => {
  const { data } = await axios.get(`http://localhost:5000/items/${category}`);
  return data;
};

const CategoryDetails = () => {
  const { category } = useParams(); 
  const [selectedItem, setSelectedItem] = useState(null); 
  const [cart, setCart] = useState([]);

  // Fetch items for the specific category
  const {
    data: items = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["categoryItems", category],
    queryFn: () => fetchCategoryItems(category),
  });

  // Loading and Error Handling
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  // Handle the selection of an item to view more details
  const handleShowDetails = (item) => {
    setSelectedItem(item);
  };

  // Handle adding item to cart
  const handleAddToCart = (item) => {
    setCart((prevCart) => [...prevCart, item]);
  };

  // Handle closing the modal
  const handleCloseModal = () => {
    setSelectedItem(null);
  }; 

  return (
    <div className="container mx-auto mt-20">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Medicines in Category: {category}
      </h1>

      {/* Medicines Table */}
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">#</th>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Generic Name</th>
            <th className="border border-gray-300 px-4 py-2">Description</th>
            <th className="border border-gray-300 px-4 py-2">Price</th>
            <th className="border border-gray-300 px-4 py-2">quantity</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={item._id}>
              <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
              <td className="border border-gray-300 px-4 py-2">{item.itemName}</td>
              <td className="border border-gray-300 px-4 py-2">{item.genericName}</td>
              <td className="border border-gray-300 px-4 py-2">{item.description}</td>
              <td className="border border-gray-300 px-4 py-2">${item.price-item.discount}</td>
              <td className="border border-gray-300 px-4 py-2">${item.quantity}</td>
              <td className="border border-gray-300 px-4 py-2">
                {/* Eye Button to show details */}
                <button
                  onClick={() => handleShowDetails(item)}
                  className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                >
                  Eye
                </button>

                {/* Select Button to add to cart */}
                <button
                  onClick={() => handleAddToCart(item)}
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  Select
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for showing detailed information of the selected item */}
      {selectedItem && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-2xl font-bold mb-4">{selectedItem.itemName}</h3>
            <img
              src={selectedItem.imgaurl}
              alt={selectedItem.itemName}
              className="w-40 h-40 object-cover mb-4 mx-auto"
            />
            <p className="mb-2">Generic Name: {selectedItem.genericName}</p>
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

      {/* Cart Summary */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Cart:</h2>
        <ul>
          {cart.map((item, index) => (
            <li key={index} className="mb-2">
              {item.itemName} - ${item.price}
            </li>
          ))}
        </ul>
        <p className="font-semibold">Total: ${cart.reduce((acc, item) => acc + item.price, 0).toFixed(2)}</p>
      </div>
    </div>
  );
};

export default CategoryDetails;
