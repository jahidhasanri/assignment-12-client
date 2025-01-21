import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const fetchCategories = async () => {
  const { data } = await axios.get("http://localhost:5000/category");
  return data;
};


const fetchItems = async () => {
  const { data } = await axios.get("http://localhost:5000/items");
  return data;
};

const Category = () => {
    const navigate = useNavigate()
  const {
    data: categories = [], 
    isLoading: isLoadingCategories,
    isError: isErrorCategories,
    error: errorCategories,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

   
  const {
    data: items = [],
    isLoading: isLoadingItems,
    isError: isErrorItems,
    error: errorItems,
  } = useQuery({
    queryKey: ["items"],
    queryFn: fetchItems,
  });

  if (isLoadingCategories || isLoadingItems) return <p>Loading...</p>;


  if (isErrorCategories || isErrorItems)
    return (
      <p>
        Error:{" "}
        {errorCategories?.message || errorItems?.message || "Something went wrong"}
      </p>
    );

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center"> Categories</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {categories.map((category) => {
          const filteredItems = items.filter(
            (item) => item.category === category.categoryName
          );
          
          return (
            <div
              key={category._id}
              className="p-4 border rounded shadow hover:shadow-lg transition scale-95"
              onClick={()=>{
                navigate(`/categorydetails/${category.categoryName}`)
              }}
            >
                <h2 className="text-lg font-semibold mb-2">{category.categoryName}</h2>
              <img
                src={category?.imgaurl}
                alt={category?.categoryName}
                className="w-full h-[250px] rounded"
              />
              
            
              <h2 className="text-lg font-semibold mt-2">
                Medicines: {filteredItems.length}
              </h2>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Category;
