const express = require('express');
const { sequelize } = require('./models');
const productRoutes = require('./routes/productRoutes');
const warehouseRoutes = require('./routes/warehouseRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes');

const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const app = express();

// ✅ Middleware
app.use(express.json()); // replaces body-parser
app.use(cors());         // enable CORS
app.use(morgan('dev'));  // logging

// ✅ Routes
app.use('/api/products', productRoutes);
app.use('/api/warehouses', warehouseRoutes);
app.use('/api/inventories', inventoryRoutes);

// ✅ 404 Handler
app.use((req, res, next) => {
  res.status(404).json({ error: 'Route not found' });
});

// ✅ Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong' });
});

// ✅ Configurable Port
const PORT = process.env.PORT || 3000;

// ✅ Safe Sync (only during dev)
sequelize.sync({ alter: false }).then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => {
  console.error('Sequelize sync failed:', err);
});
