import { Calendar } from 'react-date-range';
import { FaUserAlt, FaDollarSign } from 'react-icons/fa';
import { BsFillCartPlusFill, BsFillHouseDoorFill } from 'react-icons/bs';
import 'react-date-range/dist/styles.css'; // Main style file
import 'react-date-range/dist/theme/default.css'; // Theme styles
import UseAxiosSecure from '../../hooks/UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';

const AdminHome = () => {
    const axiosSecure = UseAxiosSecure();
    const [selectedDate, setSelectedDate] = useState(new Date());

    // Fetching admin home data from the backend
    const { data: adminData = {}, isLoading } = useQuery({
        queryKey: ["adminhome"],
        queryFn: async () => {
            const res = await axios.get('http://localhost:5000/adminhome');
            return res.data;
        },
    });

    if (isLoading) {
        return <p className="text-center mt-20 text-2xl font-bold">Loading...</p>;
    }

    const handleDateChange = (date) => {
        setSelectedDate(date);
        console.log("Selected Date:", date);
    };

    return (
        <div className="mt-12">
            {/* Small cards */}
            <div className="mb-12 grid gap-y-10 gap-x-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {/* Total Revenue */}
                <div className="relative flex flex-col bg-white text-gray-700 shadow-md rounded-xl">
                    <div className="bg-gradient-to-tr from-orange-600 to-orange-400 text-white mx-4 rounded-xl shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                        <FaDollarSign className="w-6 h-6 text-white" />
                    </div>
                    <div className="p-4 text-right">
                        <p className="text-sm font-normal text-blue-gray-600">Total Revenue</p>
                        <h4 className="text-2xl font-semibold text-blue-gray-900">${adminData?.totalRevenue || 0}</h4>
                    </div>
                </div>

                {/* Total Paid */}
                <div className="relative flex flex-col bg-white text-gray-700 shadow-md rounded-xl">
                    <div className="bg-gradient-to-tr from-blue-600 to-blue-400 text-white mx-4 rounded-xl shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                        <BsFillCartPlusFill className="w-6 h-6 text-white" />
                    </div>
                    <div className="p-4 text-right">
                        <p className="text-sm font-normal text-blue-gray-600">Total Paid</p>
                        <h4 className="text-2xl font-semibold text-blue-gray-900">{adminData?.totalPaid || 0}</h4>
                    </div>
                </div>

                {/* Total Pending */}
                <div className="relative flex flex-col bg-white text-gray-700 shadow-md rounded-xl">
                    <div className="bg-gradient-to-tr from-pink-600 to-pink-400 text-white mx-4 rounded-xl shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                        <BsFillHouseDoorFill className="w-6 h-6 text-white" />
                    </div>
                    <div className="p-4 text-right">
                        <p className="text-sm font-normal text-blue-gray-600">Total Pending</p>
                        <h4 className="text-2xl font-semibold text-blue-gray-900">{adminData?.totalPending || 0}</h4>
                    </div>
                </div>

                {/* Total Users */}
                <div className="relative flex flex-col bg-white text-gray-700 shadow-md rounded-xl">
                    <div className="bg-gradient-to-tr from-green-600 to-green-400 text-white mx-4 rounded-xl shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                        <FaUserAlt className="w-6 h-6 text-white" />
                    </div>
                    <div className="p-4 text-right">
                        <p className="text-sm font-normal text-blue-gray-600">Total Users</p>
                        <h4 className="text-2xl font-semibold text-blue-gray-900">{adminData?.totalUser || 0}</h4>
                    </div>
                </div>
            </div>

            {/* Chart and Calendar Section */}
            <div className="mb-4 grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
                {/* Sales Bar Chart Placeholder */}
                <div className="relative flex flex-col bg-white text-gray-700 shadow-md rounded-xl overflow-hidden xl:col-span-2 p-6">
                    <h3 className="text-lg font-semibold mb-4">Sales Overview</h3>
                    <p className="text-gray-500">Chart goes here...</p>
                </div>

                {/* Calendar Section */}
                <div className="hidden md:flex relative  flex-col bg-white text-gray-700 shadow-md rounded-xl p-6">
                    <h3 className="text-lg font-semibold mb-4">Select a Date</h3>
                    <Calendar
                        date={selectedDate}
                        onChange={handleDateChange}
                        color="#4cc718"
                    />
                    <p className="mt-4 text-gray-600">
                        Selected Date: {selectedDate.toDateString()}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;
