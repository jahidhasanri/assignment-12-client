import React, { useContext } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { AuthContext } from '../../Provider/AuthProvider';
import { useQuery } from '@tanstack/react-query';

const AskForAdvertisement = () => {
  const { user } = useContext(AuthContext);

  // Fetch medicines based on user's email using React Query
  const { data: medicines = [], isLoading, isError } = useQuery({
    queryKey: ['manageMedicine', user?.email],
    queryFn: async () => {
      try {
        const response = await axios.get(`http://localhost:5000/data/${user.email}`);
        return response.data;
      } catch (error) {
        toast.error('Failed to fetch medicines');
        throw error;
      }
    },
  });

  // Handle advertisement submission
  const handleAddAdvertisement = async (medicine) => {
    if (!medicine.description || !medicine.imgaurl) {
      toast.error('All fields are required!');
      return;
    }

    const formData = {
      medicineId: medicine._id,
      medicineName: medicine.itemName,
      category: medicine.category,
      price: medicine.price,
      description: medicine.description,
      imgaurl: medicine.imgaurl,
      sellerEmail: user.email,
      status: 'requested'
    };

    try {
      const response = await axios.post('http://localhost:5000/advertisements', formData);
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message || 'Failed to submit advertisement');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong! Please try again.');
    }
  };

  if (isLoading) {
    return <div className="text-center text-lg font-semibold mt-10">Loading...</div>;
  }

  if (isError) {
    return <div className="text-center text-red-500 font-semibold mt-10">Error loading medicines data.</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <ToastContainer></ToastContainer>
      <h2 className="text-2xl font-bold text-center mb-6">Manage Advertisement Requests</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-sm sm:text-base">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="border border-gray-300 p-3">Medicine Name</th>
              <th className="border border-gray-300 p-3">Medicine Image</th>
              <th className="border border-gray-300 p-3">Category</th>
              <th className="border border-gray-300 p-3">Price</th>
              <th className="border border-gray-300 p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {medicines.map((medicine) => (
              <tr key={medicine._id} className="text-center border-b hover:bg-gray-100">
                <td className="border border-gray-300 p-3">{medicine.itemName}</td>
                <td className="border border-gray-300 p-3">
                  <img className="w-20 h-20 object-cover mx-auto rounded-lg" src={medicine.imgaurl} alt={medicine.itemName} />
                </td>
                <td className="border border-gray-300 p-3">{medicine.category}</td>
                <td className="border border-gray-300 p-3 text-green-600 font-semibold">${medicine.price}</td>
                <td className="border border-gray-300 p-3">
                  <button
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                    onClick={() => handleAddAdvertisement(medicine)}
                  >
                    Ask for Advertisement
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AskForAdvertisement;
