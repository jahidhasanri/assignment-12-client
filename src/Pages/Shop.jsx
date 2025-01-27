import axios from 'axios';
import React, { useContext, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../Provider/AuthProvider';
import { toast, ToastContainer } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import UseCard from '../UseCard';
import UseAdmin from '../hooks/UseAdmin';

const fetchItems = async () => {
  try {
    const { data } = await axios.get('http://localhost:5000/items');
    return data;
  } catch (error) {
    throw new Error('Failed to fetch items');
  }
};

const Shop = () => {
  const [isAdmin] = UseAdmin();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [card, refetch] = UseCard();

  const {
    data: items = [],
    isLoading: isLoadingItems,
    isError: isErrorItems,
    error: errorItems,
  } = useQuery({
    queryKey: ['items'],
    queryFn: fetchItems,
  });

  const [selectedItem, setSelectedItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortByPrice, setSortByPrice] = useState('asc'); // For sorting
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Number of items per page

  const handleSearch = (items) => {
    return items.filter((item) =>
      item.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.genericName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.companyName?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const handleSortByPrice = (items) => {
    return items.sort((a, b) => {
      if (sortByPrice === 'asc') {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
  };

  const handlePagination = (items) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return items.slice(startIndex, endIndex);
  };

  const handleAddToCart = async (item) => {
    if (user && user?.email) {
      if (item.email === user.email) {
        toast.error("You cannot add your own product to the cart.");
        return;
      }

      const cartItem = {
        itemId: item._id,
        email: user.email,
        name: item.itemName,
        image: item.imgaurl,
        price: item.price - item.discount,
        available_quantity: item.quantity,
        quantity: 1,
        status: 'pending',
        seller: item.email
      };

      try {
        const { data } = await axios.post('http://localhost:5000/cards', cartItem);
        if (data) {
          await refetch();
          toast.success('Item added successfully to the cart');
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

  const handleShowDetails = (item) => {
    setSelectedItem(item);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        handleCloseModal();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  if (isLoadingItems) return <p>Loading...</p>;

  if (isErrorItems) {
    return (
      <p>
        Error: {errorItems?.response?.data?.message || errorItems.message || 'Something went wrong'}
      </p>
    );
  }

  const filteredItems = handleSearch(items);
  const sortedItems = handleSortByPrice(filteredItems);
  const paginatedItems = handlePagination(sortedItems);

  return (
    <div>
      <div className="mt-20 container mx-auto">
        <ToastContainer />

        <Helmet>
          <title>MediCart | Shop</title>
        </Helmet>
        <h2 className="text-2xl font-bold mb-5 text-center">Shop - All Medicines</h2>

        {/* Search input */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by name, generic name, or company"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border rounded"
          />
        </div>

        {/* Sort by price */}
        <div className="mb-4">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded mr-2"
            onClick={() => setSortByPrice(sortByPrice === 'asc' ? 'desc' : 'asc')}
          >
            Sort by Price ({sortByPrice === 'asc' ? 'Ascending' : 'Descending'})
          </button>
        </div>

        {/* Medicine Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-200">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2">Image</th>
                <th className="border border-gray-300 p-2">Name</th>
                <th className="border border-gray-300 p-2">Price</th>
                <th className="border border-gray-300 p-2">Quantity</th>
                <th className="border border-gray-300 p-2">Discount</th>
                <th className="border border-gray-300 p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedItems.map((item) => (
                <tr key={item._id}>
                  <td className="border border-gray-300 p-2">
                    <img
                      src={item.imgaurl}
                      alt={item.itemName}
                      className="w-20 h-20 object-cover"
                    />
                  </td>
                  <td className="border border-gray-300 p-2">{item.itemName}</td>
                  <td className="border border-gray-300 p-2">${item.price}</td>
                  <td className="border border-gray-300 p-2">{item?.quantity || 'No available'}</td>
                  <td className="border border-gray-300 p-2">{item.discount}$</td>
                  <td className="border border-gray-300 p-2">
                    <button
                      onClick={() => handleAddToCart(item)}
                      className={`px-4 py-2 rounded mr-2 w-20 ${isAdmin || item.quantity === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 text-white'}`}
                      disabled={isAdmin || item.quantity === 0}
                    >
                      Select
                    </button>
                    <button
                      onClick={() => handleShowDetails(item)}
                      className="bg-blue-500 text-white px-4 py-2 w-20 rounded mt-2"
                    >
                      Eye
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-4 mb-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="px-4 py-2 bg-blue-500 text-white rounded mr-2"
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Next
          </button>
        </div>

        {/* Item Detail Modal */}
        {selectedItem && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h3 className="text-2xl font-bold mb-4">{selectedItem.itemName}</h3>
              <img
                src={selectedItem.imgaurl}
                alt={selectedItem.itemName}
                className="w-[400px] h-[300px] mb-4 mx-auto"
              />
              <p className="mb-2">Price: ${selectedItem.price}</p>
              <p className="mb-2">Discount: {selectedItem.discount}$</p>
              <p className="mb-2">Available quantity: {selectedItem.quantity}</p>
              <p className="mb-4">
                Description: {selectedItem?.description || 'No description available.'}
              </p>
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
