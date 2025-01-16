import React, { useContext, useState } from "react";
import { imageupload } from "../../utils";
import axios from "axios";
import { toast } from "react-toastify";
import {useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";

const AddItem = () => {
    const {user}=useContext(AuthContext)
   
    const navigate = useNavigate();
  const handleSubmit = async(e) => {
    e.preventDefault(); 
    const seller= {
        name: user?.displayName,
        image: user?.photoURL,
        email: user?.email
    }
    const img = e.target.img.files[0]
    const imgaurl= await imageupload(img)
    const itemData = {
      itemName: e.target.item_name.value,
      genericName: e.target.generic_name.value,
      description: e.target.description.value,
      category: e.target.category.value,
      company: e.target.company.value,
      unit: e.target.unit.value,
      imgaurl,
      seller,
      price: parseFloat(e.target.price.value),
      discount: parseInt(e.target.discount.value) || 0, 
    };

    console.log("Item Data:", itemData);

    
    // e.target.reset(); 
    try {
        const { data } = await axios.post("http://localhost:5000/items", itemData);
      
        if (data) {
          toast.success("Food item added successfully");
          e.target.reset();
          navigate("/");
        } else {
          toast.error("Failed to add food item");
        }
      } catch (error) {
        console.error("Error:", error);
        if (error.response) {
          // Server responded with a status other than 2xx
          toast.error(`Error: ${error.response.data.message || error.response.statusText}`);
        } else if (error.request) {
          // Request was made but no response received
          toast.error("No response from server");
        } else {
          // Something else went wrong
          toast.error(`Error: ${error.message}`);
        }
      }

    
  };
  

  return (
    <div className="mt-20 mb-5">
      <div className="container mx-auto">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Item Name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-black">Item Name</span>
            </label>
            <input
              type="text"
              name="item_name"
              placeholder="Enter Item Name"
              className="input input-bordered text-black"
              required
            />
          </div>

          {/* Generic Name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-black">Generic Name</span>
            </label>
            <input
              type="text"
              name="generic_name"
              placeholder="Enter Generic Name"
              className="input input-bordered text-black"
              required
            />
          </div>

          {/* Description */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-black">Description</span>
            </label>
            <textarea
              name="description"
              placeholder="Enter Short Description"
              className="textarea textarea-bordered text-black"
              required
            />
          </div>

          {/* Image Upload */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-black">Image</span>
            </label>
            <input
              type="file"
              name="img"
              className="file-input file-input-bordered text-black"
              required
            />
          </div>

          {/* Category Dropdown */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-black">Category</span>
            </label>
            <select
              name="category"
              className="select select-bordered text-black"
              defaultValue=""
              required
            >
              <option value="" disabled>
                Select Category
              </option>
              <option value="tablet">Tablet</option>
              <option value="syrup">Syrup</option>
              <option value="capsule">Capsule</option>
              <option value="injection">Injection</option>
              <option value="injection">Antibiotics</option>
              <option value="others">Vitamins and Supplements</option>
            </select>
          </div>

          {/* Company Dropdown */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-black">Company</span>
            </label>
            <select
              name="company"
              className="select select-bordered text-black"
              defaultValue=""
              required
            >
              <option value="" disabled>
                Select Company
              </option>
              <option value="company_a">ACI Limited</option>
              <option value="company_b">ACME Laboratories Ltd.</option>
              <option value="company_c">Ad-din Pharmaceuticals Ltd.</option>
              <option value="company_c">Aexim Pharmaceuticals Ltd.</option>
              <option value="company_c">Apollo Pharmaceutical Ltd.</option>
            </select>
          </div>

          {/* Item Mass Unit */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-black">Item Mass Unit</span>
            </label>
            <select
              name="unit"
              className="select select-bordered text-black"
              defaultValue=""
              required
            >
              <option value="" disabled>
                Select Unit
              </option>
              <option value="mg">MG</option>
              <option value="ml">ML</option>
            </select>
          </div>

          {/* Price */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-black">Price (Per Unit)</span>
            </label>
            <input
              type="number"
              name="price"
              placeholder="Enter Price"
              className="input input-bordered text-black"
              required
            />
          </div>

          {/* Discount */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-black">Discount (%)</span>
            </label>
            <input
              type="number"
              name="discount"
              placeholder="Enter Discount"
              className="input input-bordered text-black"
            />
          </div>

          {/* Submit Button */}
          <button className="btn btn-primary">Add Item</button>
        </form>
      </div>
    </div>
  );
};

export default AddItem;
