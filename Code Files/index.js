const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./src/utils/db');

const authRoutes = require('./src/routes/auth');
const adminRoutes = require('./src/routes/admin');
const materialRoutes = require('./src/routes/materials');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database Connection
connectDB();

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/materials', materialRoutes);

// Health Check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Ticket Classification API is operational' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});