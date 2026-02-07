import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock login logic - replace with actual API call using axios when backend is ready
    if (email === 'admin@ym.com') {
      setUser({ name: 'Admin User', email, role: 'admin' });
      navigate('/admin');
    } else {
      setUser({ name: 'John Doe', email, role: 'user' });
      navigate('/');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Login to YourMarket</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
            type="password"
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
          Login
        </button>
        <div className="text-center mt-4">
          <Link to="/signup" className="text-blue-600 hover:underline text-sm">Don't have an account? Create your account</Link>
        </div>
        <p className="text-xs text-gray-500 text-center mt-4">
            Admin Login: admin@ym.com / (any password)
        </p>
      </form>
    </div>
  );
};

export default Login;