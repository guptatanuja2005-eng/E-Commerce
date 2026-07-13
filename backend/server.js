const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const dns = require('dns');

dns.setServers(["1.1.1.1", "8.8.8.8"]);

dotenv.config();
connectDB();

const app = express();

/**

* ✅ FINAL CORS FIX (BEST + SIMPLE)
* * Allows ALL origins (no more Vercel URL issues)
* * Works for localhost + production
    */
    app.use(cors({
    origin: true,
    credentials: true
    }));

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/payment', require('./routes/paymentRoutes'));
app.use('/api/analytics', require('./routes/analyticsRoutes'));

// Test Route
app.get('/', (req, res) => {
res.json({
success: true,
message: 'ShoppingHub Backend API is running 🚀'
});
});

// Server Start
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
});

