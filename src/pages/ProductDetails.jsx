import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProductDetails = ({ cart, setCart, wishlist, setWishlist, recentlyViewed, setRecentlyViewed }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [mainImage, setMainImage] = useState('');

  useEffect(() => {
    // Fetch specific product
    axios.get(`http://localhost:5000/api/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(err => {
        console.error(err);
        setProduct({
          id,
          name: `Dummy Product ${id}`,
          price: (Math.random() * 10000).toFixed(2),
          quantity: 10,
          description: 'Detailed description of the product goes here. This is dummy data.',
          images: ['https://via.placeholder.com/600x400', 'https://via.placeholder.com/100', 'https://via.placeholder.com/100']
        });
      });

    // Fetch related products (mocking by fetching general list)
    axios.get(`http://localhost:5000/api/products?limit=8`)
      .then(res => setRelatedProducts(res.data))
      .catch(err => {
        console.error(err);
        setRelatedProducts(Array.from({ length: 8 }).map((_, i) => ({
          id: i + 100,
          name: `Related Product ${i + 1}`,
          price: (Math.random() * 10000).toFixed(2),
          images: ['https://via.placeholder.com/150']
        })));
      });
  }, [id]);

  useEffect(() => {
    if (product && product.images && product.images.length > 0) {
        setMainImage(product.images[0]);
    }
    
    // Add to recently viewed
    if (product) {
        setRecentlyViewed(prev => {
            const filtered = prev.filter(p => p.id !== product.id);
            return [product, ...filtered].slice(0, 10); // Keep last 10
        });
    }
  }, [product]);

  const addToCart = () => {
    if (cart.find(item => item.id === product.id)) {
        alert("Item already in cart!");
        return;
    }
    if (cart.length >= 8) {
        alert("You cannot add more than 8 different products to the cart.");
        return;
    }
    setCart([...cart, product]);
    alert("Added to cart!");
  };

  const addToWishlist = () => {
    if (wishlist.find(item => item.id === product.id)) {
        alert("Already in wishlist!");
        return;
    }
    setWishlist([...wishlist, product]);
    alert("Added to wishlist!");
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div className="space-y-12">
      {/* Main Interface */}
      <div className="grid md:grid-cols-2 gap-8 bg-white p-6 rounded-xl shadow-sm">
        <div className="space-y-4">
          {/* Display multiple images */}
          {product.images && product.images.length > 0 ? (
            <div className="grid gap-4">
                <img src={mainImage} alt="Main" className="w-full rounded-lg object-cover aspect-video" />
                <div className="grid grid-cols-3 gap-2">
                    {product.images.map((img, idx) => (
                        <img 
                            key={idx} 
                            src={img} 
                            alt={`View ${idx}`} 
                            className={`w-full rounded-lg object-cover aspect-square cursor-pointer hover:opacity-80 ${mainImage === img ? 'ring-2 ring-blue-500' : ''}`}
                            onClick={() => setMainImage(img)}
                        />
                    ))}
                </div>
            </div>
          ) : (
            <img src="https://via.placeholder.com/400" alt="Main" className="w-full rounded-lg object-cover aspect-video" />
          )}
        </div>
        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
          <p className="text-gray-600 leading-relaxed">{product.description}</p>
          <h2 className="text-2xl text-blue-600 font-bold">Price: ₹ {product.price}</h2>
          <p className="text-sm font-medium text-gray-500">Availability: <span className={product.quantity > 0 ? 'text-green-600' : 'text-red-600'}>{product.quantity > 0 ? 'In Stock' : 'Out of Stock'}</span></p>
          <div className="flex gap-4">
            <button onClick={addToCart} className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">Add to Cart</button>
            <button onClick={addToWishlist} className="flex-1 bg-gray-800 text-white py-3 rounded-lg font-semibold hover:bg-gray-900 transition-colors">Wishlist</button>
          </div>
          <button className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors">Buy Now</button>
        </div>
      </div>

      {/* Scroll down to see other products */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold">You might also like</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {relatedProducts.map(p => (
            <div key={p.id} className="bg-white p-2 rounded border hover:shadow-md transition-shadow cursor-pointer">
               <img src="https://via.placeholder.com/100" alt={p.name} className="w-full aspect-square object-cover mb-2 rounded" />
               <h4 className="text-sm font-medium truncate">{p.name}</h4>
               <p className="text-blue-600 font-bold text-xs">₹ {p.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
