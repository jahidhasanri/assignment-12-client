import React, { useContext } from 'react';
import { AuthContext } from './Provider/AuthProvider';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';

const PaymentHistoryFUser = () => {
  const { user } = useContext(AuthContext);

  // Fetch payment history using react-query
  const { data: payments = [], isLoading, isError, error } = useQuery({
    queryKey: ['userPayment', user?.email],
    queryFn: async () => {
      try {
        if (user?.email) {
          const response = await axios.get(`http://localhost:5000/userPayment/${user.email}`);
          return response.data;
        } else {
          toast.error('User email is not available');
          return [];
        }
      } catch (err) {
        toast.error('Failed to fetch payment history');
        throw err;
      }
    },
    enabled: !!user?.email, 
  });

  // Handle loading state
  if (isLoading) {
    return <p className="text-center text-gray-600 mt-5">Loading payment history...</p>;
  }

  // Handle error state
  if (isError) {
    return <p className="text-center text-red-500 mt-5">Error fetching payment history: {error?.message}</p>;
  }

  return (
    <div className="container mx-auto mt-24 px-4">
      <h2 className="text-2xl font-semibold text-center mb-5">Payment History</h2>
      {payments.length === 0 ? (
        <p className="text-center text-gray-500">No payment history available.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border border-gray-300 shadow-lg">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-3 text-left">Transaction ID</th>
                <th className="border p-3 text-left">Amount</th>
                <th className="border p-3 text-left">Date</th>
                <th className="border p-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment._id} className="hover:bg-gray-100 text-gray-700">
                  <td className="border p-3">{payment.transactionId}</td>
                  <td className="border p-3">${payment.price}</td>
                  <td className="border p-3">{new Date(payment.date).toLocaleDateString()}</td>
                  <td className="border p-3">
                    <span
                      className={`px-3 py-1 rounded text-white ${
                        payment.status === 'Paid' ? 'bg-green-500' : 'bg-yellow-500'
                      }`}
                    >
                      {payment.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PaymentHistoryFUser;
