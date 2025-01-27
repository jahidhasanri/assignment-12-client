import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import UseCard from "../UseCard";
import { AuthContext } from "../Provider/AuthProvider";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

// Function to fetch items from a specific category
const fetchCategoryItems = async (category) => {
  const { data } = await axios.get(`http://localhost:5000/items/${category}`);
  return data;
};

const CategoryDetails = () => {
  const { user } = useContext(AuthContext);
  const [card, refetch] = UseCard();
  const { category } = useParams();
  const [selectedItem, setSelectedItem] = useState(null);

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

  // Add to cart
  const handleAddToCart = async (item) => {
    if (user && user?.email) {
      const cartItem = {
        itemId: item._id,
        email: user.email,
        name: item.itemName,
        image: item.imgaurl,
        price: item.price - item.discount,
        available_quantity: item.quantity,
        quantity: 1,
      };

      try {
        const { data } = await axios.post('http://localhost:5000/cards', cartItem);
        if (data) {
          toast.success('Item added successfully to the cart');
          refetch(); // Trigger refetch to update the cart
        } else {
          toast.error('Failed to add item to the cart');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      Swal.fire({
        title: 'You are not logged in',
        text: 'Please log in to add items to the cart',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Login!',
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login', { state: { from: location } });
        }
      });
    }
  };

  // Loading and Error Handling
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  // Handle the selection of an item to view more details
  const handleShowDetails = (item) => {
    setSelectedItem(item);
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
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">#</th>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Generic Name</th>
              <th className="border border-gray-300 px-4 py-2">Description</th>
              <th className="border border-gray-300 px-4 py-2">Price</th>
              <th className="border border-gray-300 px-4 py-2">Quantity</th>
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
                <td className="border border-gray-300 px-4 py-2">${item.price - item.discount}</td>
                <td className="border border-gray-300 px-4 py-2">{item.quantity}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {/* Eye Button to show details */}
                  <button
                    onClick={() => handleShowDetails(item)}
                    className="bg-blue-500 text-white px-4 py-2 rounded mr-2 w-20 mb-2"
                  >
                    Eye
                  </button>

                  {/* Select Button to add to cart */}
                  <button
                    onClick={() => handleAddToCart(item)}
                    className={`px-4 py-2 rounded mr-2 w-20 ${
                      item.quantity === 0
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-green-500 text-white'
                    }`}
                    disabled={item.quantity === 0}
                  >
                    Select
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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
            <p className="mb-2">Available quantity: {selectedItem.quantity}</p>
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
    </div>
  );
};

export default CategoryDetails;
