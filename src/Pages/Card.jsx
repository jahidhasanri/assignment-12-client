import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import UseCard from "../UseCard";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";

const Card = () => {
  const navigate = useNavigate();
  const [card, refetch] = UseCard();
  
  // State to manage quantities
  const [quantities, setQuantities] = useState(
    card.reduce((acc, item) => ({ ...acc, [item._id]: 1 }), {})
  );

  // Calculate total price based on quantity
  const totalPrice = card.reduce(
    (total, item) => total + item.price * (quantities[item._id] || 1),
    0
  );

  const handleDelete = async (id) => {
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
          const { data } = await axios.delete(
            `http://localhost:5000/cards/${id}`
          );
          if (data.deletedCount > 0) {
            toast.success("Item deleted successfully!");
            refetch();
          } else {
            toast.error("Failed to delete item!");
            
          }
        } catch (error) {
          // console.error("Error:", error);
          toast.error(error.response.data);
        }
      }
    });
  };

  const handleIncrease = (id, availableQuantity) => {
    setQuantities((prev) => {
      if ((prev[id] || 1) < availableQuantity) {
        return { ...prev, [id]: (prev[id] || 1) + 1 };
      } else {
        toast.warning("You have reached the maximum available quantity!");
        return prev;
      }
    });
  };

  const handleDecrease = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max((prev[id] || 1) - 1, 1),
    }));
  };

  const handlePayment = async () => {
    try {
      // Prepare the updated cart data
      const updatedCart = card.map((item) => ({
        itemId: item.itemId,
        quantity: quantities[item._id] || 1,
      }));

      console.log("Sending cart data to server:", updatedCart);

      // Send the update request to the server
      const { data } = await axios.put(
        "http://localhost:5000/update-quantity",
        updatedCart
      );

      if (data.modifiedCount > 0) {
        toast.success("Payment successful! Quantities updated.");
        refetch();
        // Remove items from the cart
        await Promise.all(
          card.map((item) =>
            axios.delete(`http://localhost:5000/cards/${item._id}`)
          )
        );

        // Wait 2 seconds and redirect to the home page
        setTimeout(() => {
          
        }, 2000);
      } else {
        toast.error("No items were updated. Check quantities.");
      }
    } catch (error) {
      console.error(
        "Payment Error:",
        error.response ? error.response.data : error.message
      );
      toast.error("Something went wrong during payment.");
    }
  };

  return (
    <div className="">
      <ToastContainer />
      <div className="flex justify-evenly mb-4">
        <h2 className="text-4xl">Items: {card.length}</h2>
        <h2 className="text-4xl">Total Price: ${totalPrice.toFixed(2)}</h2>
        {card.length > 0 ? (
          <Link onClick={handlePayment}  to="/dashboard/payment">
            <button className="btn btn-primary">Pay</button>
          </Link>
        ) : (
          <button disabled className="btn btn-primary">Pay</button>
        )}

        {/* {card.length > 0 ? (
          <button onClick={handlePayment} className="btn btn-primary">
            Pay
          </button>
        ) : (
          <button disabled className="btn btn-primary">
            Pay
          </button>
        )} */}
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
              <th>available Quantity</th>
              <th> Quantity</th>
              <th> Status</th>
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
                        <img src={item.image} alt="Product" />
                      </div>
                    </div>
                  </div>
                </td>
                <td>{item.name}</td>
                <td>${item.price}</td>
                <td>${item.available_quantity}</td>
                <td>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleDecrease(item._id)}
                      className="btn btn-sm btn-outline"
                    >
                      -
                    </button>
                    <span>{quantities[item._id]}</span>
                    <button
                      onClick={() =>
                        handleIncrease(item._id, item.available_quantity)
                      }
                      className="btn btn-sm btn-outline"
                    >
                      +
                    </button>
                  </div>
                </td>
                <td>{item.status}</td>
                <td>
                  <button
                    onClick={() => handleDelete(item._id)}
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
