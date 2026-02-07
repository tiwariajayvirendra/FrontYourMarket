import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = ({ user }) => {
  const [products, setProducts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({ name: '', price: '', quantity: '', description: '' });
  const [showForm, setShowForm] = useState(false);

  // Fetch products on load
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/products?limit=100', { timeout: 500 });
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products", err);
      setProducts(Array.from({ length: 10 }).map((_, i) => ({
        id: i + 1,
        name: `Admin Dummy Product ${i + 1}`,
        price: (Math.random() * 10000).toFixed(2),
        quantity: Math.floor(Math.random() * 100),
        description: 'Description'
      })));
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`http://localhost:5000/api/products/${id}`);
        fetchProducts();
      } catch (err) {
        alert('Failed to delete');
      }
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(`http://localhost:5000/api/products/${currentProduct.id}`, currentProduct);
      } else {
        await axios.post('http://localhost:5000/api/products', currentProduct);
      }
      setShowForm(false);
      setIsEditing(false);
      setCurrentProduct({ name: '', price: '', quantity: '', description: '' });
      fetchProducts();
    } catch (err) {
      alert('Failed to save product');
    }
  };

  const startEdit = (product) => {
    setCurrentProduct(product);
    setIsEditing(true);
    setShowForm(true);
  };

  if (user?.role !== 'admin') {
    return <div className="text-center text-red-500 mt-10">Access Denied. Admins only.</div>;
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <button 
          onClick={() => { setShowForm(!showForm); setIsEditing(false); setCurrentProduct({ name: '', price: '', quantity: '', description: '' }); }}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {showForm ? 'Cancel' : 'Add New Product'}
        </button>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div className="bg-gray-100 p-6 rounded-lg shadow-inner">
          <h2 className="text-xl font-semibold mb-4">{isEditing ? 'Edit Product' : 'Add New Product'}</h2>
          <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input className="p-2 border rounded" placeholder="Product Name" value={currentProduct.name} onChange={e => setCurrentProduct({...currentProduct, name: e.target.value})} required />
            <input className="p-2 border rounded" type="number" placeholder="Price (INR)" value={currentProduct.price} onChange={e => setCurrentProduct({...currentProduct, price: e.target.value})} required />
            <input className="p-2 border rounded" type="number" placeholder="Quantity" value={currentProduct.quantity} onChange={e => setCurrentProduct({...currentProduct, quantity: e.target.value})} required />
            <textarea className="p-2 border rounded md:col-span-2" placeholder="Description" value={currentProduct.description} onChange={e => setCurrentProduct({...currentProduct, description: e.target.value})} />
            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 md:col-span-2">
              {isEditing ? 'Update Product' : 'Upload Product'}
            </button>
          </form>
        </div>
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b bg-gray-50 flex gap-4">
          <input type="text" placeholder="Search products..." className="flex-1 px-4 py-2 border rounded" />
          <select className="px-4 py-2 border rounded">
            <option>Sort by Name</option>
            <option>Sort by Price</option>
            <option>Sort by Stock</option>
          </select>
        </div>
        
        <table className="w-full text-left">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-6 py-3">Product</th>
              <th className="px-6 py-3">Price</th>
              <th className="px-6 py-3">Stock</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {products.map(product => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">{product.name}</td>
                <td className="px-6 py-4">₹{product.price}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${product.quantity > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {product.quantity > 0 ? `In Stock (${product.quantity})` : 'Out of Stock'}
                  </span>
                </td>
                <td className="px-6 py-4 space-x-2">
                  <button onClick={() => startEdit(product)} className="text-blue-600 hover:underline">Edit</button>
                  <button onClick={() => handleDelete(product.id)} className="text-red-600 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;