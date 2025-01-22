import React, { useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { NavLink } from "react-router-dom";
import { imageupload } from "../../utils";
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import "react-toastify/dist/ReactToastify.css";

const fetchCategories = async () => {
  const { data } = await axios.get("http://localhost:5000/category");
  return data;
};

const ManageCategory = () => {
  const {
    data: categories = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({ queryKey: ["categories"], queryFn: fetchCategories });

  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const img = e.target.img.files[0];
    const imgaurl = await imageupload(img);

    const itemData = {
      imgaurl,
      categoryName: e.target.categoryName.value,
    };

    try {
      const { data } = await axios.post(
        "http://localhost:5000/category",
        itemData
      );
      if (data) {
        toast.success("Category added successfully");
        refetch();
        setTimeout(() => document.getElementById("add_modal").close(), 500);
        e.target.reset();
      } else {
        toast.error("Failed to add category");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while adding the category.");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const img = e.target.img.files[0];
    const imgaurl = img ? await imageupload(img) : selectedCategory.imgaurl;

    const updatedData = {
      imgaurl,
      categoryName: e.target.categoryName.value,
    };

    try {
      const { data } = await axios.put(
        `http://localhost:5000/category/${selectedCategory._id}`,
        updatedData
      );
      if (data.modifiedCount > 0) {
        toast.success("Category updated successfully");
        refetch();
        setTimeout(() => document.getElementById("update_modal").close(), 500);
      } else {
        toast.error("Failed to update category");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while updating the category.");
    }
  };

  const handelDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const { data } = await axios.delete(
            `http://localhost:5000/category/${id}`
          );
          if (data.deletedCount > 0) {
            toast.success("Category deleted successfully");
            refetch();
          } else {
            toast.error("Failed to delete category");
          }
        } catch (error) {
          console.error("Error:", error);
          toast.error("An error occurred while deleting the category.");
        }
      }
    });
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error?.message || "Something went wrong"}</p>;

  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">
          Manage Categories ({categories.length})
        </h1>
        <NavLink
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => document.getElementById("add_modal").showModal()}
        >
          Add Category
        </NavLink>

        <div className="mt-4">
          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">#</th>
                <th className="border p-2">Category Name</th>
                <th className="border p-2">Image</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category, index) => (
                <tr key={category._id}>
                  <td className="border p-2 text-center">{index + 1}</td>
                  <td className="border p-2 text-center">
                    {category.categoryName}
                  </td>
                  <td className="border p-2 text-center">
                    <img
                      src={category.imgaurl}
                      className="h-12 w-12 mx-auto"
                      alt={category.categoryName}
                    />
                  </td>
                  <td className="border p-2 text-center flex gap-4 justify-around">
                    <button
                      className="bg-green-400 text-white px-3 py-1 rounded"
                      onClick={() => {
                        setSelectedCategory(category);
                        document.getElementById("update_modal").showModal();
                      }}
                    >
                      Update
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded"
                      onClick={() => handelDelete(category._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <dialog id="add_modal" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Add New Category</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-black">Category Name</span>
                </label>
                <select
                  name="categoryName"
                  className="select select-bordered w-full text-black"
                  required
                >
                  <option value="" disabled selected>
                    Select a category
                  </option>
                  <option value="tablet">Tablet</option>
                  <option value="syrup">Syrup</option>
                  <option value="capsule">Capsule</option>
                  <option value="injection">Injection</option>
                  <option value="antibiotics">Antibiotics</option>
                  <option value="vitamins_and_supplements">
                    Vitamins and Supplements
                  </option>
                  <option value="pain_relief">Pain Relief</option>
                  <option value="skincare">Skincare</option>
                  <option value="others">Others</option>
                </select>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-black">Image</span>
                </label>
                <input
                  type="file"
                  name="img"
                  accept="image/*"
                  className="file-input file-input-bordered w-full"
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary mt-4">
                Add
              </button>
              <button
                type="button"
                className="btn btn-secondary ml-2"
                onClick={() => document.getElementById("add_modal").close()}
              >
                Close
              </button>
            </form>
          </div>
        </dialog>

        <dialog id="update_modal" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Update Category</h3>
            <form onSubmit={handleUpdate}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-black">Category Name</span>
                </label>
                <select
                  name="categoryName"
                  defaultValue={selectedCategory?.categoryName || ""}
                  className="select select-bordered w-full text-black"
                  required
                >
                  <option value="" disabled>
                    Select a category
                  </option>
                  <option value="tablet">Tablet</option>
                  <option value="syrup">Syrup</option>
                  <option value="capsule">Capsule</option>
                  <option value="injection">Injection</option>
                  <option value="antibiotics">Antibiotics</option>
                  <option value="vitamins_and_supplements">
                    Vitamins and Supplements
                  </option>
                  <option value="pain_relief">Pain Relief</option>
                  <option value="skincare">Skincare</option>
                  <option value="others">Others</option>
                </select>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-black">
                    Image (optional)
                  </span>
                </label>
                <input
                  type="file"
                  name="img"
                  accept="image/*"
                  className="file-input file-input-bordered w-full"
                />
              </div>
              <button type="submit" className="btn btn-primary mt-4">
                Update
              </button>
              <button
                type="button"
                className="btn btn-secondary ml-2"
                onClick={() => document.getElementById("update_modal").close()}
              >
                Close
              </button>
            </form>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default ManageCategory;
