import React from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import { NavLink, Outlet } from 'react-router-dom';
import UseCard from '../UseCard';
import { BiSolidCategory } from 'react-icons/bi';
import { HiUsers } from 'react-icons/hi';
import { FaHome } from 'react-icons/fa';

const Dashboard = () => {
    const [card]=UseCard();
    const isAdmin = true;
    return (
        <div className='flex container mx-auto'>
            <div className="w-64 min-h-screen bg-orange-400">
                <ul className="menu p-4 lg:mt-6">
                    {
                        isAdmin?
                        <>
                        <li className='mb-5 '><NavLink to={'/dashboard/cart'}><FiShoppingCart /> My Card</NavLink></li>
                    <li className='mb-5'><NavLink to="managecategory"><BiSolidCategory /> Manage category</NavLink></li>
                    <li className='mb-5'><NavLink to='manageusers'><HiUsers /> Manage Users</NavLink></li>
                    <div className="divider"></div>
                    <li className='mb-5'><NavLink to='/'><FaHome/> Home</NavLink></li>
                        </>
                        :
                        <>
                        </>
                    }
                    
                </ul>
            </div>
            <div className='flex-1 p-8'>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;