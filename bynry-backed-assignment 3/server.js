const express = require('express');
const { sequelize } = require('./models');
const productRoutes = require('./routes/productRoutes');
const warehouseRoutes = require('./routes/warehouseRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes');
const alertRoutes = require('./routes/alertRoutes');

const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// Routes
app.use('/api/products', productRoutes);
app.use('/api/warehouses', warehouseRoutes);
app.use('/api/inventories', inventoryRoutes);
app.use('/api', alertRoutes); // 👈 This enables: /api/companies/:companyId/alerts/low-stock

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 3000;

sequelize.sync({ alter: false }).then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => {
  console.error('Sequelize sync failed:', err);
});
