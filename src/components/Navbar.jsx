import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaUser, FaSearch, FaBars, FaTimes } from 'react-icons/fa';

const Navbar = ({ user, setUser, cartCount }) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    setUser(null);
    setIsMenuOpen(false);
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      {/* Left Side: Company Name and Logo */}
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2 cursor-pointer group" onClick={() => navigate('/')}>
          <img src="/logo.png" alt="Logo" className="w-10 h-10" />
          <span className="text-2xl font-bold text-blue-600 group-hover:text-blue-700 transition-colors">YourMarket</span>
        </div>

        {/* Mobile Menu Button & Cart */}
        <div className="md:hidden flex items-center gap-4">
          <div className="relative cursor-pointer">
            <FaShoppingCart className="text-2xl text-gray-600 hover:text-blue-600" />
            {cartCount > 0 && <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{cartCount}</span>}
          </div>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-600 focus:outline-none">
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Right Side: 5 Tabs with Hover Effects */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-gray-600 hover:text-blue-600 font-medium px-3 py-2 rounded-md hover:bg-blue-50 transition-all duration-200 border-b-2 border-transparent hover:border-blue-600">Home</Link>
          <Link to="/?category=Electronics" className="text-gray-600 hover:text-blue-600 font-medium px-3 py-2 rounded-md hover:bg-blue-50 transition-all duration-200 border-b-2 border-transparent hover:border-blue-600">Electronics</Link>
          <Link to="/?category=Fashion" className="text-gray-600 hover:text-blue-600 font-medium px-3 py-2 rounded-md hover:bg-blue-50 transition-all duration-200 border-b-2 border-transparent hover:border-blue-600">Fashion</Link>
          <Link to="/?category=Beauty" className="text-gray-600 hover:text-blue-600 font-medium px-3 py-2 rounded-md hover:bg-blue-50 transition-all duration-200 border-b-2 border-transparent hover:border-blue-600">Beauty</Link>
          
          {user ? (
            <div className="flex items-center gap-4 ml-4">
              <Link to="/profile" className="text-sm font-semibold hover:text-blue-600">Hello, {user.name}</Link>
              <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors">Logout</button>
            </div>
          ) : (
            <Link to="/login" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">Login</Link>
          )}
          <div className="relative cursor-pointer">
            <FaShoppingCart className="text-2xl text-gray-600 hover:text-blue-600" />
            {cartCount > 0 && <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{cartCount}</span>}
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 py-2 px-4 flex flex-col gap-2 shadow-lg">
          <Link to="/" onClick={() => setIsMenuOpen(false)} className="block text-gray-600 hover:text-blue-600 font-medium py-2">Home</Link>
          <Link to="/?category=Electronics" onClick={() => setIsMenuOpen(false)} className="block text-gray-600 hover:text-blue-600 font-medium py-2">Electronics</Link>
          <Link to="/?category=Fashion" onClick={() => setIsMenuOpen(false)} className="block text-gray-600 hover:text-blue-600 font-medium py-2">Fashion</Link>
          <Link to="/?category=Beauty" onClick={() => setIsMenuOpen(false)} className="block text-gray-600 hover:text-blue-600 font-medium py-2">Beauty</Link>
          
          <div className="border-t border-gray-100 my-2 pt-2">
             {user ? (
              <div className="flex flex-col gap-2">
                <span className="text-sm font-semibold">Hello, {user.name}</span>
                <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors w-full text-left">Logout</button>
              </div>
            ) : (
              <Link to="/login" onClick={() => setIsMenuOpen(false)} className="block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors text-center">Login</Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
