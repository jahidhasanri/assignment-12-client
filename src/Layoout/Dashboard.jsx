import React from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import { NavLink, Outlet } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div className='flex container mx-auto'>
            <div className="w-64 min-h-screen bg-orange-400">
                <ul className="menu p-4">
                    <li className='mb-5'><NavLink to={'/dashboard/cart'}><FiShoppingCart /> My Card</NavLink></li>
                    <li className='mb-5'><NavLink to="/me"><FiShoppingCart /> My Card</NavLink></li>
                    <li className='mb-5'><NavLink to='/hi'><FiShoppingCart /> My Card</NavLink></li>
                    <li className='mb-5'><NavLink to='/'><FiShoppingCart /> Home</NavLink></li>
                </ul>
            </div>
            <div className='flex-1 p-8'>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;