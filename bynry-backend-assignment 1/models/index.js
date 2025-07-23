const { Sequelize, DataTypes } = require('sequelize');

// Connect to SQLite database
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite' // This file will be created
});

// Models
const Product = require('./product')(sequelize, DataTypes);
const Inventory = require('./inventory')(sequelize, DataTypes);
const Warehouse = require('./warehouse')(sequelize, DataTypes);

// Define associations
Product.hasMany(Inventory, { foreignKey: 'product_id' });
Inventory.belongsTo(Product, { foreignKey: 'product_id' });

Warehouse.hasMany(Inventory, { foreignKey: 'warehouse_id' });
Inventory.belongsTo(Warehouse, { foreignKey: 'warehouse_id' });

// Export all
module.exports = {
  sequelize,
  Product,
  Inventory,
  Warehouse
};
