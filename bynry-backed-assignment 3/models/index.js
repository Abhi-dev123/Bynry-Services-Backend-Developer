const { Sequelize, DataTypes } = require('sequelize');

// Connect to SQLite database
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
});

// Load models
const Product = require('./product')(sequelize, DataTypes);
const Inventory = require('./inventory')(sequelize, DataTypes);
const Warehouse = require('./warehouse')(sequelize, DataTypes);
const Supplier = require('./supplier')(sequelize, DataTypes); // ✅ Include Supplier

// Define associations
Product.hasMany(Inventory, { foreignKey: 'product_id' });
Inventory.belongsTo(Product, { foreignKey: 'product_id' });

Warehouse.hasMany(Inventory, { foreignKey: 'warehouse_id' });
Inventory.belongsTo(Warehouse, { foreignKey: 'warehouse_id' });

// ✅ Supplier → Product relationship
Supplier.hasMany(Product, { foreignKey: 'supplier_id' });
Product.belongsTo(Supplier, { foreignKey: 'supplier_id' });

// Export all models
module.exports = {
  sequelize,
  Product,
  Inventory,
  Warehouse,
  Supplier // ✅ Export it too
};
