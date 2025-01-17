import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";



const CategoryDetails = () => {
  const { category } = useParams(); // Get category from the URL
  const fetchCategoryItems = async (category) => {
    const { data } = await axios.get(`http://localhost:5000/items/${category}`);
    return data;
  };
  // Fetch items for the specific category
  const {
    data: items = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["categoryItems", category],
    queryFn: () => fetchCategoryItems(category),
  });

  // Loading and Error Handling
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div className="container mx-auto mt-20">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Medicines in Category: {category}
      </h1>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">#</th>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Generic Name</th>
            <th className="border border-gray-300 px-4 py-2">Description</th>
            <th className="border border-gray-300 px-4 py-2">Price</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={item._id}>
              <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
              <td className="border border-gray-300 px-4 py-2">{item.itemName}</td>
              <td className="border border-gray-300 px-4 py-2">{item.genericName}</td>
              <td className="border border-gray-300 px-4 py-2">{item.description}</td>
              <td className="border border-gray-300 px-4 py-2">${item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryDetails;
