import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';

const cardColors = [
  'bg-red-100', 'bg-yellow-100', 'bg-green-100', 'bg-blue-100', 
  'bg-indigo-100', 'bg-purple-100', 'bg-pink-100', 'bg-teal-100'
];

const Home = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') || 'All';
  const [activeTab, setActiveTab] = useState(categoryParam);
  const navigate = useNavigate();

  useEffect(() => {
    setActiveTab(categoryParam);
    setProducts([]); // Reset products on category change
    setPage(0);
  }, [categoryParam]);

  // Fetch products for infinite scroll behavior
  const fetchProducts = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/products?limit=16&offset=${page * 16}&category=${activeTab}`);
      setProducts(prev => [...prev, ...res.data]);
    } catch (err) {
      console.error(err);
      // Fallback dummy data if backend is not running
      const dummy = Array.from({ length: 16 }).map((_, i) => ({
        id: `dummy-${page}-${i}`,
        name: `Dummy Product ${page * 16 + i + 1}`,
        price: (Math.random() * 10000).toFixed(2),
        description: 'High quality product description.',
        availability: Math.random() > 0.2 ? 'In Stock' : 'Out of Stock',
        images: ['https://via.placeholder.com/150']
      }));
      setProducts(prev => [...prev, ...dummy]);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page, activeTab]);

  // Infinite scroll handler
  const handleScroll = () => {
    if (page >= 5) return;
    if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {
      setPage(prev => prev + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [page]);

  const handleTabClick = (tab) => {
    navigate(`/?category=${tab}`);
  };

  return (
    <div className="space-y-8">
      {/* Product Tabs below Navbar */}
      <div className="flex overflow-x-auto gap-4 pb-2 border-b border-gray-200">
        {['All', 'Electronics', 'Fashion', 'Beauty', 'Home'].map(tab => (
          <button 
            key={tab}
            onClick={() => handleTabClick(tab)}
            className={`whitespace-nowrap px-4 py-2 rounded-full transition-colors ${activeTab === tab ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-blue-100 hover:text-blue-700'}`}
          >{tab}</button>
        ))}
      </div>

      {/* Pagination on top side */}
      <div className="flex justify-end items-center gap-2">
        <span className="text-gray-600">Page {page + 1}</span>
        {/* Add actual pagination logic if not using pure infinite scroll */}
      </div>

      {/* Grid Layout: 2 columns mobile, 5 columns desktop */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 px-2">
        {products.map((product, index) => (
          <div 
            key={product.id} 
            className="bg-white border rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer p-2 group"
            onClick={() => navigate(`/product/${product.id}`)}
          >
            {/* Placeholder image if no images yet */}
            <div className={`aspect-square ${cardColors[index % cardColors.length]} overflow-hidden rounded mb-2`}>
              <img 
                src={product.images && product.images.length > 0 ? product.images[0] : 'https://via.placeholder.com/150'} 
                alt={product.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
              />
            </div>
            <div className="flex justify-between items-start">
                <h3 className="text-sm font-medium truncate flex-1">{product.name}</h3>
                <span className={`text-[10px] px-1 rounded ${product.availability === 'In Stock' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{product.availability === 'In Stock' ? 'In Stock' : 'Out'}</span>
            </div>
            <p className="text-blue-600 font-bold text-sm mt-1">₹ {product.price}</p>
            <p className="text-xs text-gray-500 truncate">{product.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
