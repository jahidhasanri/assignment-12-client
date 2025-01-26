import React, { useState, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AuthContext } from '../../Provider/AuthProvider';
import { useQuery } from '@tanstack/react-query';

const AskForAdvertisement = () => {
  const { user } = useContext(AuthContext);
  const [description, setDescription] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

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
      sellerEmail: user.email
    };
  
    try {
      const response = await axios.post('http://localhost:5000/advertisements', formData);
  
      console.log('Server Response:', response.data);
  
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message || 'Failed to submit advertisement');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error(error.response?.data?.message || 'Something went wrong! Please try again.');
    }
  };
  

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading medicines data.</div>;
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Manage Advertisement Requests</h2>

      <table className="table-auto w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 p-2">Medicine Name</th>
            <th className="border border-gray-300 p-2">Medicine Image</th>
            <th className="border border-gray-300 p-2">Category</th>
            <th className="border border-gray-300 p-2">Price</th>
            <th className="border border-gray-300 p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {medicines.map((medicine) => (
            <tr key={medicine._id} className="text-center">
              <td className="border border-gray-300 p-2">{medicine.itemName}</td>
              <td className="border border-gray-300 p-2">
                <img className="w-8/12 h-24 mx-auto" src={medicine.imgaurl} alt={medicine.itemName} />
              </td>
              <td className="border border-gray-300 p-2">{medicine.category}</td>
              <td className="border border-gray-300 p-2">${medicine.price}</td>
              <td className="border border-gray-300 p-2">
                <button
                  className="btn btn-primary"
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
  );
};

export default AskForAdvertisement;
