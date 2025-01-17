import React from 'react';
import Slider from '../Components/Slider';
import { Helmet } from 'react-helmet';
import Category from '../Components/Category';

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>MediCard | Home</title>
            </Helmet>
            <Slider></Slider>
            <Category></Category>
        </div>
    );
};

export default Home;