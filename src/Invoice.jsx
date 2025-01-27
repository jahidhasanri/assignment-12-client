import React, { useContext, useRef } from 'react';
import { AuthContext } from './Provider/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable'; // Import jsPDF autotable plugin for table generation

const Invoice = () => {
  const { user } = useContext(AuthContext);
  const invoiceRef = useRef();

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

  // Handle loading and error states at the top level
  if (isLoading) {
    return <p className="text-center text-gray-600 mt-5">Loading payment history...</p>;
  }

  if (isError) {
    return <p className="text-center text-red-500 mt-5">Error fetching payment history: {error?.message}</p>;
  }

  // Function to generate and download PDF
  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    // Add Invoice title
    doc.setFontSize(18);
    doc.text('Invoice', 14, 20);
    doc.setFontSize(12);

    // Add Date
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 30);

    // Add Customer Information
    doc.text(`Name: ${user?.displayName || 'N/A'}`, 14, 40);
    doc.text(`Email: ${user?.email || 'N/A'}`, 14, 50);

    // Add Purchase Details Table
    const tableColumn = ['Item Name', 'Amount', 'Date', 'Status'];
    const tableRows = payments.map((payment) => [
      payment.itemName || 'N/A',
      `$${payment.price}`,
      new Date(payment.date).toLocaleDateString(),
      payment.status,
    ]);

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 60,
      margin: { top: 10 },
    });

    // Add Total Amount
    const totalAmount = payments.reduce((sum, payment) => sum + payment.price, 0);
    doc.text(`Total Amount: $${totalAmount}`, 14, doc.lastAutoTable.finalY + 10);

    // Download the PDF
    doc.save(`Invoice_${user?.email}.pdf`);
  };

  return (
    <div className="container mx-auto mt-20 p-5">
      {/* Printable Invoice Content */}
      <div ref={invoiceRef} className="bg-white p-8 shadow-lg border border-gray-300 rounded-lg">
        {/* Invoice Header */}
        <div className="flex justify-between items-center border-b pb-4">
          <img
            src="https://i.ibb.co/W03pnBR/medicare-logo-for-medical-and-health-service-vector-49166684.jpg"
            alt="Website Logo"
            className="h-16"
          />
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Invoice</h1>
            <p className="text-gray-600">Date: {new Date().toLocaleDateString()}</p>
          </div>
        </div>

        {/* Customer Information */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-700">Customer Information</h2>
          <p>
            <strong>Name:</strong> {user?.displayName || 'N/A'}
          </p>
          <p>
            <strong>Email:</strong> {user?.email || 'N/A'}
          </p>
        </div>

        {/* Purchase Details */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-700">Purchase Details</h2>
          {payments.length > 0 ? (
            <table className="w-full border-collapse border border-gray-300 mt-4">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 px-4 py-2 text-left">Item Name</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Amount</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Date</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr key={payment._id} className="hover:bg-gray-100 text-gray-700">
                    <td className="border border-gray-300 px-4 py-2">{payment.itemName || 'N/A'}</td>
                    <td className="border border-gray-300 px-4 py-2">${payment.price}</td>
                    <td className="border border-gray-300 px-4 py-2">
                      {new Date(payment.date).toLocaleDateString()}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <span
                        className={`px-3 py-1 rounded text-white ${
                          payment.status === 'Paid' ? 'bg-green-500' : 'bg-red-500'
                        }`}
                      >
                        {payment.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-red-500 mt-3">No purchase history available.</p>
          )}
        </div>

        {/* Total Amount */}
        <div className="mt-8 text-right">
          <p className="text-lg font-semibold">
            Total Amount:{' '}
            <span className="text-green-600">
              ${payments.reduce((sum, payment) => sum + payment.price, 0)}
            </span>
          </p>
        </div>
      </div>

      {/* Print Button */}
      <div className="mt-6 text-center">
        <button
          onClick={handleDownloadPDF}
          className="bg-blue-600 text-white px-6 py-2 rounded shadow hover:bg-blue-700 transition-all"
        >
          Download Invoice as PDF
        </button>
      </div>
    </div>
  );
};

export default Invoice;
