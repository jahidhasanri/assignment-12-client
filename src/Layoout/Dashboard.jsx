import React, { useContext, useState } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { NavLink, Outlet } from "react-router-dom";
import UseCard from "../UseCard";
import { BiSolidCategory } from "react-icons/bi";
import { HiUsers } from "react-icons/hi";
import { FaHome } from "react-icons/fa";
import UseAdmin from "../hooks/UseAdmin";
import Payment from "../users/Payment";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { AuthContext } from "../Provider/AuthProvider";
import UseSeller from "../hooks/UseSeller";
import { CgProfile } from "react-icons/cg";
import { MdPayment, MdTransferWithinAStation } from "react-icons/md";

const Dashboard = () => {
  const [card] = UseCard();
  const { user } = useContext(AuthContext);
  const [isAdmin] = UseAdmin();
  const [isseller] = UseSeller();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to open modal
  const openModal = () => setIsModalOpen(true);

  // Function to close modal
  const closeModal = () => setIsModalOpen(false);

  // Function to send PATCH request
  const handleSendRequest = async () => {
    try {
      const response = await axios.patch(
        `http://localhost:5000/users/${user?.email}`
      );

      if (response.data.modifiedCount > 0) {
        toast.success("Request sent successfully!");
      } else {
        toast.warn("You have already requested. Please wait for approval.");
      }
    } catch (error) {
      toast.error(
        error.response?.data || "Failed to send request. Try again later."
      );
    } finally {
      closeModal(); // Ensure the modal closes in any case
    }
  };

  return (
    <div className="flex container mx-auto">
      <ToastContainer></ToastContainer>
      <div className="w-64 min-h-screen bg-orange-400">
        <ul className="menu p-4 lg:mt-6">
          {isAdmin ? (
            <>
              <li className="mb-5">
                <NavLink to="managecategory">
                  <BiSolidCategory /> Manage Category
                </NavLink>
              </li>
              <li className="mb-5">
                <NavLink to="manageusers">
                  <HiUsers /> Manage Users
                </NavLink>
              </li>
              <div className="divider"></div>

              <li className="mb-5">
                <NavLink to="/">
                  <FaHome /> Home
                </NavLink>
              </li>
              <li className="mb-5">
                <NavLink to="profile">
                  <CgProfile /> Profile
                </NavLink>
              </li>

            </>
          ) : isseller ? (
            <>

              <li className="mb-5">
                <NavLink to="manageMedicine">
                  <FaHome /> Manage Medicine
                </NavLink>
              </li>
              <li className="mb-5">
                <NavLink to="advertisement">
                  <FaHome /> Ask For Advertisement
                </NavLink>
              </li>
              <div className="divider"></div>

              <li className="mb-5">
                <NavLink to="/">
                  <FaHome /> Home
                </NavLink>
              </li>
              <li className="mb-5">
                <NavLink to="profile">
                  <CgProfile /> Profile
                </NavLink>
              </li>

            </>
          ) : (
            <>
              <li className="mb-5">
                <NavLink to={"/dashboard/cart"}>
                  <FiShoppingCart /> My Cart
                </NavLink>
              </li>
              <li className="mb-5">
                <NavLink to="/dashboard/payment">
                  <MdPayment /> Payment
                </NavLink>
              </li>
              <li className="mb-5">
                <a href="#" onClick={openModal}>
                  <MdTransferWithinAStation /> Become A Seller
                </a>
              </li>
              <div className="divider"></div>

              <li className="mb-5">
                <NavLink to="/">
                  <FaHome /> Home
                </NavLink>
              </li>
              <li className="mb-5">
                <NavLink to="profile">
                  <CgProfile /> Profile
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>

      <div className="flex-1 p-8">
        <Outlet />
      </div>

      {/* Modal Section */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-bold mb-4">Become A Seller</h2>
            <p className="mb-6 text-gray-600">
              Fill in your details to become a seller on our platform.
            </p>

            <div className="flex justify-around gap-4">
              <button
                onClick={handleSendRequest}
                className="px-4 py-2 bg-red-500 text-white rounded-lg"
              >
                Send Request
              </button>
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-green-500 text-white rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
