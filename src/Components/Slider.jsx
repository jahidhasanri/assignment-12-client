import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  // Toastify CSS import
import Slider from 'react-slick';  // Import react-slick for carousel
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css'; 

const SliderComponent = () => {
  const { data: medicines = [], isLoading, isError } = useQuery({
    queryKey: ['manageMedicine'],
    queryFn: async () => {
      try {
        const response = await axios.get(`http://localhost:5000/advertisements`);
        return response.data;
      } catch (error) {
        toast.error('Failed to fetch medicines');
        throw error;
      }
    },
  });

  // Filter medicines with 'active' status
  const activeMedicines = medicines.filter(ad => ad.status === 'active');

  // Slider settings for react-slick
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    
  };

  return (
    <div className='mt-20 mb-10'>
      <div className=''>
        <h2 className="text-2xl font-bold text-center pt-6 pb-5">Active Advertisements Slider</h2>
        
        {/* Toast Container for notifications */}
        <ToastContainer position="top-right" autoClose={3000} theme="colored" />

        {isLoading && <p className="text-center text-blue-500">Loading advertisements...</p>}
        {isError && <p className="text-center text-red-500">Failed to load advertisements</p>}

        {/* React Slider */}
        <Slider {...settings}>
          {activeMedicines.length > 0 ? (
            activeMedicines.map((ad) => (
              <div key={ad._id} className=" ">
                <img
                  src={ad.imgaurl}
                  alt={ad.medicineName}
                  className="w-full h-[600px]  rounded"
                />
                {/* <h3 className="text-lg font-semibold mt-2 text-center">{ad.medicineName}</h3>
                <p className="text-gray-600 text-center">{ad.description}</p> */}
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No active advertisements available</p>
          )}
        </Slider>
      </div>
    </div>
  );
};

export default SliderComponent;
