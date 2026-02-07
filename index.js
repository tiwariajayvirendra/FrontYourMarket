const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
app.use(cors());
app.use(express.json());

// Database connection configuration
// Ensure you have a MySQL database named 'yourmarket' running
// For demonstration purposes, we will use an in-memory array if DB fails or for quick testing
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password', // Replace with your actual password
  database: 'yourmarket'
});

// db.connect((err) => {
//   if (err) console.error('Database connection failed:', err);
//   else console.log('Connected to MySQL');
// });

// Mock Data for immediate running without DB setup
let mockProducts = Array.from({ length: 50 }).map((_, i) => ({
  id: i + 1,
  name: `Product ${i + 1}`,
  price: (Math.random() * 10000).toFixed(2),
  quantity: Math.floor(Math.random() * 100),
  description: 'High quality product description. Features latest technology and design.',
  category: ['Electronics', 'Fashion', 'Home', 'Beauty'][Math.floor(Math.random() * 4)],
  images: [
    'https://via.placeholder.com/600x400',
    'https://via.placeholder.com/100',
    'https://via.placeholder.com/100',
    'https://via.placeholder.com/100'
  ]
}));

// Routes
app.get('/api/products', (req, res) => {
  // Mock data to support the frontend infinite scroll
  const limit = parseInt(req.query.limit) || 16;
  const offset = parseInt(req.query.offset) || 0;
  const search = req.query.search ? req.query.search.toLowerCase() : '';
  const sort = req.query.sort;
  
  let filtered = mockProducts.filter(p => p.name.toLowerCase().includes(search));
  
  if (sort === 'price_asc') {
    filtered.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
  } else if (sort === 'price_desc') {
    filtered.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
  }

  const paginated = filtered.slice(offset, offset + limit);
  
  res.json(paginated);
});

app.get('/api/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const product = mockProducts.find(p => p.id === id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

// Admin: Add Product
app.post('/api/products', (req, res) => {
  const newProduct = {
    id: mockProducts.length + 1,
    ...req.body,
    images: ['https://via.placeholder.com/600x400'] // Default image
  };
  mockProducts.unshift(newProduct); // Add to top
  res.json(newProduct);
});

// Admin: Update Product
app.put('/api/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = mockProducts.findIndex(p => p.id === id);
  if (index !== -1) {
    mockProducts[index] = { ...mockProducts[index], ...req.body };
    res.json(mockProducts[index]);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

// Admin: Delete Product
app.delete('/api/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  mockProducts = mockProducts.filter(p => p.id !== id);
  res.json({ message: 'Deleted successfully' });
});

app.post('/api/signup', (req, res) => {
  console.log('Signup data received:', req.body);
  // Add logic to insert into MySQL here
  res.json({ message: 'User created successfully' });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});