import axios from 'axios';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const fetchItems = async () => {
  const { data } = await axios.get("http://localhost:5000/items");
  return data;
};

const Discount = () => {
  const { data: items = [] } = useQuery({
    queryKey: ["items"],
    queryFn: fetchItems,
  });

  const discountedItems = items.filter(item => item.discount > 0);

  return (
    <div className="bg-slate-200">
      <div className="mb-5">
        <h2 className="text-2xl text-center font-bold p-5">Discount Products</h2>

        {/* Swiper Slider */}
        <Swiper
          className="mySwiper"
          spaceBetween={30}
          slidesPerView={5}
          loop={true}
          grabCursor={true}
          breakpoints={{
            // Screen width >= 640px
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            // Screen width >= 768px
            768: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            // Screen width >= 1024px
            1024: {
              slidesPerView: 5,
              spaceBetween: 30,
            },
            // Default (small screens)
            0: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
          }}
        >
          {discountedItems.map((item) => (
            <SwiperSlide key={item.id}>
              <div
                className="product-card flex flex-col items-center justify-between bg-white rounded-lg shadow-md p-4"
              >
                {/* Image */}
                <img
                  src={item.imgaurl}
                  alt={item.itemName}
                  className="w-20 h-20 object-cover mb-3"
                />
                {/* Item Name */}
                <h3 className="text-lg font-medium text-center text-gray-800">
                  {item.itemName || "No Name Available"}
                </h3>
                {/* Price */}
                <p className="text-sm text-gray-600">
                  {`Price: $${(item.price - item.discount).toFixed(2)} (Discounted)`}
                </p>
                {/* Additional Info */}
                <p className="text-sm text-gray-500">
                  {item.itemName || "No Description"}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Discount;
