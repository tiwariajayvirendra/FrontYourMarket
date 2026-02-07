import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-auto">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-around items-center text-center md:text-left gap-6">
        <div>
          <h4 className="text-lg font-bold mb-2">YourMarket Inc.</h4>
          <p className="text-gray-400 text-sm">123 Market Street, Tech City, India</p>
          <p className="text-gray-400 text-sm">Contact: contact@yourmarket.com</p>
          <p className="text-gray-400 text-sm">Phone: +91 98765 43210</p>
        </div>
        <div>
          <h4 className="text-lg font-bold mb-2">Follow Us</h4>
          <div className="flex gap-4 text-2xl justify-center md:justify-start">
            <FaFacebook className="hover:text-blue-500 cursor-pointer transition-colors" />
            <FaTwitter className="hover:text-blue-400 cursor-pointer transition-colors" />
            <FaInstagram className="hover:text-pink-500 cursor-pointer transition-colors" />
          </div>
        </div>
        <div>
            <h4 className="text-lg font-bold mb-2">Information</h4>
            <ul className="text-gray-400 text-sm space-y-1">
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms & Conditions</a></li>
            </ul>
        </div>
      </div>
      <div className="border-t border-gray-800 mt-8 pt-4 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} YourMarket. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
