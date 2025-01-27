import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '../../Provider/AuthProvider';

const PaymentManagementFseller = () => {
  const { user } = useContext(AuthContext);

  const { data: medicines = [], isLoading, isError, error } = useQuery({
    queryKey: ['manageMedicine', user?.email],
    queryFn: async () => {
      try {
        if (user?.email) {
          const response = await axios.get(`http://localhost:5000/datas`);
          return response.data;
        } else {
          toast.error('User email is not available');
          return [];
        }
      } catch (err) {
        toast.error('Failed to fetch medicines');
        throw err;
      }
    },
    enabled: !!user?.email,
  });

  if (isLoading) {
    return <p>Loading payment history...</p>;
  }

  if (isError) {
    return <p>Error fetching payment history: {error?.message}</p>;
  }

  // Filtering items where the sellerEmail array includes the user's email
  const userData = medicines.filter((item) => item.sellerEmail?.includes(user.email));
  console.log(userData);

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4 text-center">Seller's Payment History</h2>
      {userData.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg table-auto">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-3 px-6 text-left w-1/4">Item Name</th>
                <th className="py-3 px-6 text-left w-1/4">Price</th>
                <th className="py-3 px-6 text-left w-1/4">Customer Email</th>
                <th className="py-3 px-6 text-left w-1/4">Status</th>
              </tr>
            </thead>
            <tbody>
              {userData.map((item) => (
                <tr key={item._id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6">{item?.item?.itemName || 'N/A'}</td>
                  <td className="py-3 px-6">${item.price || 'N/A'}</td>
                  <td className="py-3 px-6">{item.email || 'N/A'}</td>
                  <td className="py-3 px-6">{item.status || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-red-500">No payment data found for your email.</p>
      )}
    </div>
  );
};

export default PaymentManagementFseller;
