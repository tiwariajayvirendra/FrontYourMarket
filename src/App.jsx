import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminDashboard from './pages/AdminDashboard';
import UserProfile from './pages/UserProfile';

function App() {
  const [user, setUser] = useState(null); // User state management
  const [cart, setCart] = useState([]); // Cart state management
  const [wishlist, setWishlist] = useState([]);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [orders, setOrders] = useState([]); // Mock orders

  // Check for persisted session on load
  useEffect(() => {
    const storedSession = localStorage.getItem('user_session');
    if (storedSession) {
      const parsedUser = JSON.parse(storedSession);
      if (parsedUser.sessionExpiry && Date.now() < parsedUser.sessionExpiry) {
        setUser(parsedUser);
      } else {
        localStorage.removeItem('user_session'); // Session expired
      }
    }
  }, []);

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800 font-sans">
        <Navbar user={user} setUser={setUser} cartCount={cart.length} />
        <main className="flex-grow container mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={
              <ProductDetails 
                cart={cart} setCart={setCart} 
                wishlist={wishlist} setWishlist={setWishlist}
                recentlyViewed={recentlyViewed} setRecentlyViewed={setRecentlyViewed}
              />
            } />
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/signup" element={<Signup setUser={setUser} />} />
            <Route path="/admin" element={<AdminDashboard user={user} />} />
            <Route path="/profile" element={
              <UserProfile 
                user={user} 
                cart={cart} 
                wishlist={wishlist} 
                recentlyViewed={recentlyViewed} 
                orders={orders} 
              />
            } />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
