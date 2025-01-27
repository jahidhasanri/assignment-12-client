import React, { useContext, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../Provider/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { MdDelete } from 'react-icons/md';
import Swal from 'sweetalert2';
import UseAxiosSecure from '../../hooks/UseAxiosSecure';

const PaymentHistory = () => {
  const { user } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
   const [newRole, setNewRole] = useState("");
   const axiosSecure = UseAxiosSecure();

  const { data: medicines = [], isLoading, isError, error, refetch } = useQuery({
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
    enabled: !!user?.email, // Only run the query if the email is available
  });

  if (isLoading) {
    return <p>Loading payment history...</p>;
  }

  if (isError) {
    return <p>Error fetching payment history: {error?.message}</p>;
  }

  const handleDelete = (user) => {
    console.log(user);
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const { data } = await axiosSecure.delete(`/cards/${user._id}`);
            if (data.deletedCount > 0) {
              toast.success("User deleted successfully!");
              refetch(); // Refetching users data
            } else {
              toast.error("Failed to delete user!");
            }
          } catch (error) {
            console.error("Error:", error);
            toast.error("Something went wrong!");
          }
        }
      });
    };

    const handleUpdateRole = (user) => {
        setSelectedUser(user);
        setNewRole(user.status); 
        setIsModalOpen(true);
      };
      const handleRoleUpdate = async () => {
        if (newRole === selectedUser.status) return; // Don't update if the role is the same
        try {
          // Make the PATCH request to update the status of the card/medicine in the database
          const { data } = await axios.patch(`http://localhost:5000/payment/${selectedUser._id}`, {
            status: newRole,
          });
          
          if (data.modifiedCount > 0) {
            toast.success(`${selectedUser.name}'s status updated to ${newRole}.`);
            setIsModalOpen(false); // Close modal
            refetch(); // Refetching medicines data
          } else {
            toast.error("Failed to update status!");
          }
        } catch (error) {
          console.error("Error:", error.response || error);
          toast.error("Something went wrong!");
        }
      };
      
      
      
      
        // Close the modal
        const closeModal = () => {
          setIsModalOpen(false);
        };

  return (
    <div>
      <h2 className='text-2xl font-bold mb-4'>Payment History</h2>
      {medicines.length === 0 ? (
        <p>No payment history available.</p>
      ) : (
        <table className="min-w-full border-collapse border border-gray-200">
          <thead>
            <tr>
              
              <th className="border border-gray-300 p-2">Customer</th>
              <th className="border border-gray-300 p-2">Price</th>
              
              <th className="border border-gray-300 p-2">Status</th>
              <th className="border border-gray-300 p-2">Action</th>
              
            </tr>
          </thead>
          <tbody>
            {medicines.map((item) => (
              <tr key={item._id}>
                
                <td className="border border-gray-300 p-2">{item.email}</td>
                <td className="border border-gray-300 p-2">${item.price}</td>
              
                <td className="border border-gray-300 p-2">{item.status}</td>
                
                <td>
                                  <button
                                    className="btn"
                                    onClick={() => handleUpdateRole(item)}
                                  >
                                    Update Role
                                  </button>
                                  <button
                                    className="btn ml-2 text-red-600"
                                    onClick={() => handleDelete(item)}
                                  >
                                    <MdDelete />
                                  </button>
                                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
       {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-bold mb-4">
              Update Role for {selectedUser?.name}
            </h3>
            <div>
              <label htmlFor="role" className="block mb-2">
                Select Role:
              </label>
              <select
  id="role"
  value={newRole} // Correctly bind newRole to the select value
  onChange={(e) => setNewRole(e.target.value)}
  className="input input-bordered w-full mb-4"
>
  <option value="paid">paid</option>
  
  <option value="pending">Pending</option>
</select>

            </div>
            <div className="flex justify-between">
              <button className="btn btn-primary" onClick={handleRoleUpdate}>
                Confirm
              </button>
              <button className="btn btn-secondary" onClick={closeModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;
