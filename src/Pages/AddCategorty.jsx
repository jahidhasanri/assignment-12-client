import React from 'react';
import { imageupload } from '../utils';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const AddCategorty = () => {
    const navigate = useNavigate()
    
    const handleSubmit = async(e)=>{
        e.preventDefault(); 
        const img = e.target.img.files[0]
        const imgaurl= await imageupload(img)
        const itemData ={
            imgaurl,
            categoryName: e.target.categoryName.value,
        }
        try {
            const { data } = await axios.post("http://localhost:5000/category", itemData);
          
            if (data) {
              toast.success("Category added successfully");
              e.target.reset();
              navigate("/");
            } else {
              toast.error("Failed to add category");
            }
          } catch (error) {
            console.error("Error:", error);}
    }
    return (
        <div className='mt-20 container mx-auto'>
          <Helmet>
            <title>Medicard | Add Category</title>
          </Helmet>
            <div>
            <form onSubmit={handleSubmit} className="space-y-4">

            <div className="form-control">
            <label className="label">
              <span className="label-text text-black">categoryName</span>
            </label>
            <input
              type="text"
              name="categoryName"
              placeholder="Enter categoryName Name"
              className="input input-bordered text-black"
              required
            />
          </div>

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
          <button className='btn btn-primary'>Add Category</button>
            </form>
            </div>
          

        </div>
    );
};

export default AddCategorty;