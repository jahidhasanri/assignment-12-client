import React, { useContext, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { AuthContext } from '../../Provider/AuthProvider';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdDeleteForever } from 'react-icons/md';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { imageupload } from '../../utils';

const ManageMedicine = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  

  const { data: medicines = [], refetch, isLoading } = useQuery({
    queryKey: ['manageMedicine', user?.email],
    queryFn: async () => {
      const response = await axios.get(`http://localhost:5000/data/${user.email}`);
      return response.data;
    },
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const img = e.target.img.files[0];
    const imgaurl =await imageupload(img);
    const itemData = {
      itemName: e.target.item_name.value,
      genericName: e.target.generic_name.value,
      description: e.target.description.value,
      category: e.target.category.value,
      company: e.target.company.value,
      unit: e.target.unit.value,
      quantity: parseInt(e.target.quantity.value),
      imgaurl,
      name: user?.displayName,
      email: user?.email,
      price: parseFloat(e.target.price.value),
      discount: parseInt(e.target.discount.value) || 0,
    };

    try {
      const { data } = await axios.post("http://localhost:5000/items", itemData);
      if (data) {
        toast.success("Medicine added successfully");
        refetch();
        e.target.reset();
        setIsModalOpen(false);
       
        setTimeout(() => {
          navigate("/dashboard/manageMedicine");
        }, 1000); 
      } else {
        toast.error("Failed to add medicine");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

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
        await axios.delete(`http://localhost:5000/items/${id}`);
        toast.success("Item deleted successfully!");
        refetch();
      }
    });
  };

  if (isLoading) {
    return <p className="text-center text-blue-500">Loading...</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <ToastContainer />
      <h2 className="text-2xl font-bold mb-4 text-center">Manage Medicines</h2>
      <button 
        className="btn btn-primary mb-4"
        onClick={() => setIsModalOpen(true)}
      >
        Add Medicine
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 lg:pt-60 bg-black bg-opacity-50 flex justify-center items-center overflow-y-auto">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
            <h3 className="text-xl font-semibold mb-4 text-center">Add New Medicine</h3>
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
                  <option value="tablet">tablet</option>
                  <option value="syrup">syrup</option>
                  <option value="capsule">capsule</option>
                  <option value="injection">injection</option>
                  <option value="Antibiotics">Antibiotics</option>
                  <option value="Vitamins_and_Supplements">Vitamins_and_Supplements</option>
                  <option value="others">others</option>
                </select>
              </div>

              {/* Quantity */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-black">Quantity</span>
                </label>
                <input
                  type="number"
                  name="quantity"
                  placeholder="Enter Quantity"
                  className="input input-bordered text-black"
                  required
                />
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
                  <option value="company_d">Aexim Pharmaceuticals Ltd.</option>
                  <option value="company_e">Apollo Pharmaceutical Ltd.</option>
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
              <div className='flex text-center justify-center gap-12 pt-6 items-center'>
              <button className="btn btn-primary">Add Item</button>
              <button
              onClick={() => setIsModalOpen(false)}
              className="btn btn-secondary  "
            >
              Close
            </button>
              </div>
            </form>

            {/* Close Modal Button */}
            
          </div>
        </div>
      )}

      <table className="table-auto w-full border border-gray-300 mt-5">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Image</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Quantity</th>
            <th className="border p-2">Discount</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {medicines.map((item) => (
            <tr key={item._id} className="hover:bg-gray-100">
              <td className="border p-2">
                <img src={item.imgaurl || 'https://via.placeholder.com/100'} alt={item.itemName} className="w-16 h-16 rounded" />
              </td>
              <td className="border p-2">{item.itemName}</td>
              <td className="border p-2">${item.price}</td>
              <td className="border p-2">{item.quantity}</td>
              <td className="border p-2">${item.discount}</td>
              <td className="border p-2">
                <button onClick={() => handleDelete(item._id)} className="btn mx-auto text-red-500 hover:text-red-700">
                  <MdDeleteForever size={24} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageMedicine;
