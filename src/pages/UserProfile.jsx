import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserProfile = ({ user, setUser, cart, wishlist, recentlyViewed, orders }) => {
  const [activeTab, setActiveTab] = useState('wishlist');
  const navigate = useNavigate();

  if (!user) {
    return <div className="text-center py-10">Please login to view your profile.</div>;
  }

  const handleLogout = () => {
    localStorage.removeItem('user_session');
    setUser(null);
    navigate('/login');
  };

  const renderProductList = (products, emptyMessage) => {
    if (!products || products.length === 0) {
      return <div className="text-gray-500 py-4">{emptyMessage}</div>;
    }
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((product, index) => (
          <div key={`${product.id}-${index}`} className="border rounded-lg p-2 hover:shadow-md cursor-pointer" onClick={() => navigate(`/product/${product.id}`)}>
            <img src={product.images?.[0] || 'https://via.placeholder.com/150'} alt={product.name} className="w-full h-32 object-cover rounded mb-2" />
            <h4 className="font-medium truncate">{product.name}</h4>
            <p className="text-blue-600 text-sm">₹{product.price}</p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-8">
      {/* User Info Header */}
      <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col md:flex-row items-center gap-6">
        <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
          {user.name.charAt(0).toUpperCase()}
        </div>
        <div className="text-center md:text-left flex-1">
          <h1 className="text-2xl font-bold">{user.name}</h1>
          <p className="text-gray-600">{user.email}</p>
          <p className="text-gray-500 text-sm">{user.city}, {user.country}</p>
        </div>
        <div>
          <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Logout</button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto border-b border-gray-200 gap-6">
        {['Wishlist', 'Cart', 'Orders', 'Recently Viewed'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab.toLowerCase().replace(' ', ''))}
            className={`pb-2 px-1 whitespace-nowrap font-medium transition-colors ${
              activeTab === tab.toLowerCase().replace(' ', '')
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-white p-6 rounded-xl shadow-sm min-h-[300px]">
        {activeTab === 'wishlist' && (
          <div>
            <h2 className="text-xl font-bold mb-4">My Wishlist</h2>
            {renderProductList(wishlist, "Your wishlist is empty.")}
          </div>
        )}

        {activeTab === 'cart' && (
          <div>
            <h2 className="text-xl font-bold mb-4">My Cart ({cart.length} items)</h2>
            {renderProductList(cart, "Your cart is empty.")}
            {cart.length > 0 && (
                <div className="mt-6 pt-4 border-t flex justify-end">
                    <button className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">Proceed to Checkout</button>
                </div>
            )}
          </div>
        )}

        {activeTab === 'orders' && (
          <div>
            <h2 className="text-xl font-bold mb-4">Purchase History</h2>
            {/* Mock orders for now as we don't have a full checkout flow */}
            {renderProductList(orders, "No past orders found.")}
          </div>
        )}

        {activeTab === 'recentlyviewed' && (
          <div>
            <h2 className="text-xl font-bold mb-4">Recently Viewed</h2>
            {renderProductList(recentlyViewed, "No recently viewed products.")}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;