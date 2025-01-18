import React from 'react';
import Slider from '../Components/Slider';
import { Helmet } from 'react-helmet';
import Category from '../Components/Category';
import Discount from '../Components/Discount';
import HealthTips from '../Components/HelathTips';
import Testimonials from '../Components/Testimonials';


const Home = () => {
    return (
        <div>
            <Helmet>
                <title>MediCard | Home</title>
            </Helmet>
            <Slider></Slider>
            <Category></Category>
            <Discount></Discount>
            <HealthTips></HealthTips>
            <Testimonials></Testimonials>
        </div>
    );
};

export default Home;