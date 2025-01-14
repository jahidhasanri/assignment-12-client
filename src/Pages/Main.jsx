import React from 'react';
import Footer from './Footer';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';


const Main = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div  className="min-h-[calc(100vh-422px)]">

            <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Main;