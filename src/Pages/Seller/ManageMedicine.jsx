import React, { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { AuthContext } from '../../Provider/AuthProvider';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ManageMedicine = () => {
  const { user } = useContext(AuthContext);


const { data: medicines = [], isLoading, isError, error } = useQuery({
    queryKey: ['mangeMedicine', user?.email],
    queryFn: async () => {
      const response = await axios.get(`http://localhost:5000/items/${user.email}`)
      return response.data;
    },
  });
console.log(medicines);
  const handleAddToCart = (item) => {
    if (item.quantity === 0) {
      toast.error('this medicine not av');
      return;
    }
    toast.success(`${item.itemName} add to card successfully`);
  };

  if (isLoading) {
    return <p className="text-center text-blue-500">loading...</p>;
  }

  if (isError) {
    return <p className="text-center text-red-500">error: {error.message}</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Medicines</h2>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 p-2">Image</th>
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Price</th>
            <th className="border border-gray-300 p-2">Quantity</th>
            <th className="border border-gray-300 p-2">Discount</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {medicines?.map((item) => (
            <tr key={item._id}>
              <td className="border border-gray-300 p-2">
                <img src={item.imageUrl || 'https://via.placeholder.com/100'} alt={item.itemName} className="w-16 h-16" />
              </td>
              <td className="border border-gray-300 p-2">{item.itemName}</td>
              <td className="border border-gray-300 p-2">${item.price}</td>
              <td className="border border-gray-300 p-2">{item.quantity}</td>
              <td className="border border-gray-300 p-2">{item.discount || 'N/A'}</td>
              <td className="border border-gray-300 p-2">
                <button onClick={() => handleAddToCart(item)} className="bg-blue-500 text-white px-4 py-2 rounded">Add</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageMedicine;
