import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import UseCard from "../UseCard";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Card = () => {
  const [card, refetch] = UseCard();

  const totalPrice = card.reduce((total, item) => total + item.price, 0);

  const handelDelete = async (id) => {
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
          const { data } = await axios.delete(`http://localhost:5000/cards/${id}`);
          if (data.deletedCount > 0) {
            toast.success("Item deleted successfully!");
            refetch();
          } else {
            toast.error("Failed to delete item!");
          }
        } catch (error) {
          console.error("Error:", error);
          toast.error("Something went wrong!");
        }
      }
    });
  };

  return (
    <div className="">
      <ToastContainer />
      <div className="flex justify-evenly mb-4">
        <h2 className="text-4xl">Items: {card.length}</h2>
        <h2 className="text-4xl">Total Price: ${totalPrice.toFixed(2)}</h2>
        <button className="btn btn-primary">Pay</button>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {card.map((item, index) => (
              <tr key={item._id}>
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={item.image}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                  </div>
                </td>
                <td>{item.name}</td>
                <td>${item.price}</td>
                <td>
                  <button
                    onClick={() => handelDelete(item._id)}
                    className="text-red-500 btn btn-ghost btn-lg"
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

export default Card;
