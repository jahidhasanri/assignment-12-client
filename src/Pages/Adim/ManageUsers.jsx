import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState, useContext } from "react";
import { FaUsers } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import "react-toastify/dist/ReactToastify.css";
import UseAxiosSecure from "../../hooks/UseAxiosSecure";
import { AuthContext } from "../../Provider/AuthProvider";

const ManageUsers = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = UseAxiosSecure();

  // State for modal visibility and selected user
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newRole, setNewRole] = useState("");

  // Fetching users data using react-query
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
  });

  // Delete user handler
  const handleDelete = (user) => {
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
          const { data } = await axiosSecure.delete(`/users/${user._id}`);
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

  // Open the modal and set the selected user
  const handleUpdateRole = (user) => {
    setSelectedUser(user);
    setNewRole(user.role); // Set the current role as the default
    setIsModalOpen(true);
  };

  // Handle role update logic
  const handleRoleUpdate = async () => {
    if (newRole === selectedUser.role) return;
    try {
      const { data } = await axiosSecure.patch(
        `/users/role/${selectedUser.email}`, // Passing email instead of _id
        { role: newRole }
      );
      if (data.modifiedCount > 0) {
        toast.success(`${selectedUser.name} role updated to ${newRole}.`);
        setIsModalOpen(false); // Close modal
        refetch(); // Refetching users data
      } else {
        toast.error("Failed to update role!");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong!");
    }
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <ToastContainer />
      <h2 className="text-xl font-bold mb-4">Manage Users ({users.length})</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Image</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>
                  <img
                    className="w-16 h-16 rounded-full"
                    src={user.image}
                    alt={user.name}
                  />
                </td>
                <td>{user.email}</td>
                <td
                  className={
                    user?.role === "admin"
                      ? "text-red-300"
                      : user?.role === "seller"
                      ? "text-green-400"
                      : "text-yellow-300"
                  }
                >
                  {user?.role || "Unknown"}
                </td>
                <td
                  className={
                    user?.status === "verified"
                      ? "text-green-900 font-bold"
                      : user?.status === "requested"
                      ? "text-yellow-600"
                      : "text-gray-500"
                  }
                >
                  {user?.status || "Unavailable"}
                </td>
                <td>
                  <button
                    className="btn mb-2"
                    onClick={() => handleUpdateRole(user)}
                  >
                    Update Role
                  </button>
                  <button
                    className="btn ml-2"
                    onClick={() => handleDelete(user)}
                  >
                    <MdDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for updating role */}
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
                value={newRole}
                onChange={(e) => setNewRole(e.target.value)}
                className="input input-bordered w-full mb-4"
              >
                <option value="admin">Admin</option>
                <option value="seller">Seller</option>
                <option value="user">User</option>
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

export default ManageUsers;
