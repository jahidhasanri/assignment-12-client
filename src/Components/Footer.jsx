import React from 'react';
import { FaInstagramSquare, FaLinkedin } from 'react-icons/fa';
import { FaSquareFacebook, FaSquareXTwitter } from 'react-icons/fa6';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-10">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Column 1: About Us */}
                    <div>
                        <h3 className="text-xl font-bold mb-3">About Us</h3>
                        <p>We are MediCart, an online marketplace offering a wide range of medicines and healthcare products. Our mission is to provide fast, secure, and reliable services to help you get the medications you need.</p>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div>
                        <h3 className="text-xl font-bold mb-3">Quick Links</h3>
                        <ul>
                            <li><a href="/" className="hover:text-gray-400">Home</a></li>
                            <li><a href="/shop" className="hover:text-gray-400">Shop</a></li>
                            <li><a href="/contact" className="hover:text-gray-400">Contact Us</a></li>
                            <li><a href="/faq" className="hover:text-gray-400">FAQ</a></li>
                        </ul>
                    </div>

                    {/* Column 3: Customer Support */}
                    <div>
                        <h3 className="text-xl font-bold mb-3">Customer Support</h3>
                        <ul>
                            <li><a href="/privacy-policy" className="hover:text-gray-400">Privacy Policy</a></li>
                            <li><a href="/terms-conditions" className="hover:text-gray-400">Terms & Conditions</a></li>
                            <li><a href="/return-policy" className="hover:text-gray-400">Return Policy</a></li>
                        </ul>
                    </div>

                    {/* Column 4: Social Media */}
                    <div>
                        <h3 className="text-xl font-bold mb-3">Follow Us</h3>
                        <div className="flex space-x-4">
                            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                            <FaSquareFacebook className="h-8 w-8" />  
                            </a>
                            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                            <FaSquareXTwitter className="h-8 w-8" />
                            </a>
                            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                            <FaInstagramSquare className="h-8 w-8"  />
                            </a>
                            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                            <FaLinkedin className="h-8 w-8" /> 
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Section: Copyright and Info */}
                <div className="mt-10 text-center border-t border-gray-700 pt-4">
                    <p>&copy; {new Date().getFullYear()} MediCart. All rights reserved.</p>
                    <p className="text-sm">Made with ❤️ by MediCart Team</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
