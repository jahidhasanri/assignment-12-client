import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import '../navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    if (loggedInUser) {
      setUser(loggedInUser);
    }

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
    localStorage.removeItem('user');
    localStorage.removeItem('cartItems');
    setUser(null);
    setCartCount(0);
    window.location.href = '/';
  };

  return (
    <nav className="bg-slate-400 p-4">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo + Menu Icon */}
        <div className="flex items-center justify-between w-full md:w-auto">
          <div className="flex items-center space-x-2 text-white text-2xl font-bold">
            <img
              src="https://i.ibb.co/W03pnBR/medicare-logo-for-medical-and-health-service-vector-49166684.jpg"
              alt="Logo"
              className="w-8 h-8"
            />
            <span>MediCart</span>
          </div>
          <button className="md:hidden text-white ml-auto" onClick={toggleMenu}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          <NavLink to="/" className="text-white hover:text-gray-300">
            Home
          </NavLink>
          <NavLink to="/shop" className="text-white hover:text-gray-300">
            Shop
          </NavLink>
          <Link to="/cart" className="relative">
            <span className="text-white">Cart</span>
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-2">
              {cartCount}
            </span>
          </Link>
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
        </div>

        {/* Profile / Join Us */}
        <div className="hidden md:flex">
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
            <Link to="/login" className="btn-primary btn">
              Join Us
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden text-white py-4 space-y-2">
          <NavLink to="/" className="block px-4 py-2">
            Home
          </NavLink>
          <NavLink to="/shop" className="block px-4 py-2">
            Shop
          </NavLink>
          <NavLink to="/cart" className="block px-4 py-2">
            Cart
          </NavLink>
          <div className="relative">
            <button onClick={toggleLanguageMenu} className="block w-full px-4 py-2">
              Languages
            </button>
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
          {!user && (
            <Link to="/login" className="block w-full px-4 py-2 btn-primary btn">
              Join Us
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
