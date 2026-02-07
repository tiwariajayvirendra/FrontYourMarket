import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = ({ setUser }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    mobile: '',
    age: '',
    country: '',
    city: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/signup', formData);
      
      // Auto-login logic
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      const sessionDuration = isMobile ? 7 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000; // 7 days vs 24 hours
      
      const user = { ...formData, role: 'user', sessionExpiry: Date.now() + sessionDuration };
      
      // In a real app, you would store the token in localStorage/cookies here
      localStorage.setItem('user_session', JSON.stringify(user));
      
      setUser(user);
      
      alert(`Account created! You are logged in for ${isMobile ? '7 days' : '24 hours'}.`);
      navigate('/');
      
    } catch (err) {
      alert('Error signing up');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Sign Up for YourMarket</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" placeholder="Name" onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
        <input name="mobile" placeholder="Mobile Number" onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
        <input name="age" type="number" placeholder="Age" onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
        <input name="country" placeholder="Country" onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
        <input name="city" placeholder="City" onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
