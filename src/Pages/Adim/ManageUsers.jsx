import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { FaUsers } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import "react-toastify/dist/ReactToastify.css";
import UseAxiosSecure from "../../hooks/UseAxiosSecure";

const ManageUsers = () => {
  const axiosSecure = UseAxiosSecure()
  // Fetching users data using react-query
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
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

  // Make user admin handler
  const handleMakeAdmin = async (user) => {
    try {
      const { data } = await axios.patch(
        `http://localhost:5000/users/admin/${user._id}`
      );
      if (data.modifiedCount > 0) {
        toast.success(`${user.name} is now an Admin.`);
        refetch(); // Refetching users data
      } else {
        toast.error("Failed to make admin!");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong!");
    }
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
                <td>
                  {user.role === "admin" ? (
                    "Admin"
                  ) : (
                    <button
                      onClick={() => handleMakeAdmin(user)}
                      className="text-white bg-orange-500 px-4 py-2 rounded"
                    >
                      <FaUsers className="inline" /> Make Admin
                    </button>
                  )}
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(user)}
                    className="text-red-500 text-xl"
                  >
                    <MdDelete />
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

export default ManageUsers;
