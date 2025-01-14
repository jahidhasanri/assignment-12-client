import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';  // For navigation using React Router

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);  // Local state to track logged-in user
  const [cartCount, setCartCount] = useState(0);  // Local state to track cart items
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);  // For toggling language menu

  useEffect(() => {
    // Example of fetching user from localStorage (you can replace it with API calls)
    const loggedInUser = JSON.parse(localStorage.getItem('user')); // Assuming user is stored in localStorage
    if (loggedInUser) {
      setUser(loggedInUser);
    }

    // Fetching cart count from localStorage (or any other state management method)
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartCount(cartItems.length);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const toggleLanguageMenu = () => {
    setIsLanguageMenuOpen(!isLanguageMenuOpen);
  };

  const handleLogout = () => {
    // Clear user and cart data on logout
    localStorage.removeItem('user');
    localStorage.removeItem('cartItems');
    setUser(null);
    setCartCount(0);
    window.location.href = '/';  // Redirect to homepage or login page
  };

  return (
    <nav className="bg-slate-400 p-4">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo and Website Name */}
        <div className="flex items-center space-x-2 text-white text-2xl font-bold">
          <img src="https://i.ibb.co.com/W03pnBR/medicare-logo-for-medical-and-health-service-vector-49166684.jpg" alt="Logo" className="w-8 h-8" />
          <span>MediCart</span>
        </div>

        {/* Desktop Menu */}
        <div>
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-white hover:text-gray-300">Home</Link>
          <Link to="/shop" className="text-white hover:text-gray-300">Shop</Link>
          
          {/* Cart Icon */}
          <Link to="/cart" className="relative">
            <span className="text-white">Cart</span>
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-2">
              {cartCount}
            </span>
          </Link>
          
          {/* Language Dropdown */}
          <div className="relative">
            <button onClick={toggleLanguageMenu} className="text-white">
              Languages
            </button>
            {isLanguageMenuOpen && (
              <div className="absolute right-0 mt-2 bg-white text-black rounded shadow-lg w-32">
                <ul>
                  <li className="p-2 hover:bg-gray-200">English</li>
                  <li className="p-2 hover:bg-gray-200">Spanish</li>
                  <li className="p-2 hover:bg-gray-200">French</li>
                </ul>
              </div>
            )}
          </div>

          {/* Join Us / Profile Picture */}
         
        </div>
        </div>
        <div>
        {user ? (
            <div className="relative">
              <button onClick={toggleProfileMenu}>
                <img 
                  src={user.profilePic || '/default-profile.png'} 
                  alt="Profile" 
                  className="w-8 h-8 rounded-full"
                />
              </button>
              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 bg-white text-black rounded shadow-lg w-40">
                  <ul>
                    <li className="p-2 hover:bg-gray-200">
                      <Link to="/profile">Update Profile</Link>
                    </li>
                    <li className="p-2 hover:bg-gray-200">
                      <Link to="/dashboard">Dashboard</Link>
                    </li>
                    <li className="p-2 hover:bg-gray-200">
                      <button onClick={handleLogout}>Logout</button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="btn-primary btn">Join Us</Link>
          )}
        </div>
       

        {/* Mobile Menu */}
        <button className="md:hidden text-white" onClick={toggleMenu}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="md:hidden  text-white py-4">
          <Link to="/" className="block px-4 py-2">Home</Link>
          <Link to="/shop" className="block px-4 py-2">Shop</Link>
          <Link to="/cart" className="block px-4 py-2">Cart</Link>
          <div className="relative">
            <button onClick={toggleLanguageMenu} className="  px-4 py-2">Languages</button>
            {isLanguageMenuOpen && (
              <div className="bg-white text-black rounded shadow-lg w-full">
                <ul>
                  <li className="p-2 hover:bg-gray-200">English</li>
                  <li className="p-2 hover:bg-gray-200">Spanish</li>
                  <li className="p-2 hover:bg-gray-200">French</li>
                </ul>
              </div>
            )}
          </div>
          {user ? (
            <div className="relative">
              <button onClick={toggleProfileMenu} className="block w-full px-4 py-2">
                Profile
              </button>
              {isProfileMenuOpen && (
                <div className="bg-white text-black rounded shadow-lg w-full">
                  <ul>
                    <li className="p-2 hover:bg-gray-200">
                      <Link to="/profile">Update Profile</Link>
                    </li>
                    <li className="p-2 hover:bg-gray-200">
                      <Link to="/dashboard">Dashboard</Link>
                    </li>
                    <li className="p-2 hover:bg-gray-200">
                      <button onClick={handleLogout}>Logout</button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="mt-4 w-20 h-5 px-4 py-2 btn btn-primary">Join Us</Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
