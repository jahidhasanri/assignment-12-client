import React from 'react';
import Slider from '../Components/Slider';
import { Helmet } from 'react-helmet';

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>home</title>
            </Helmet>
            <Slider></Slider>
        </div>
    );
};

export default Home;