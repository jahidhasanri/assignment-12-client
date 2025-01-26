import React, { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import UseAdmin from '../hooks/UseAdmin';
import UseSeller from '../hooks/UseSeller';

const Profile = () => {
    const { user } = useContext(AuthContext);
    const [isAdmin] = UseAdmin();
    const [isseller] = UseSeller();

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-2xl p-6 max-w-sm w-full text-center">
                <img 
                    src={user?.photoURL || "https://via.placeholder.com/150"} 
                    alt="Profile" 
                    className="w-32 h-32 rounded-full mx-auto border-4 border-blue-500"
                />
                <h2 className='text-2xl text-green-400'>
                    {isAdmin ? (
                        <p>Admin</p>
                    ) : isseller ? (
                        <p>Seller</p>
                    ) : (
                        <p>User</p>
                    )}
                </h2>
                <h2 className="text-2xl font-bold mt-4 text-gray-800">
                    {user?.displayName || "User Name"}
                </h2>
                <p className="text-gray-500 mt-2">
                    {user?.email || "user@example.com"}
                </p>
            </div>
        </div>
    );
};

export default Profile;
