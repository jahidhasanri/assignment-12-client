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
            <select
                            name="categoryName"
                            className="select select-bordered text-black"
                            required
                        >
                            <option value="" disabled selected>Select a category</option>
                            <option value="tablet">Tablet</option>
                            <option value="syrup">Syrup</option>
                            <option value="capsule">Capsule</option>
                            <option value="injection">Injection</option>
                            <option value="antibiotics">Antibiotics</option>
                            <option value="vitamins_and_supplements">Vitamins and Supplements</option>
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