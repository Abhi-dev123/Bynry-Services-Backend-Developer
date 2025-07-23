module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    sku: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    threshold: {
      type: DataTypes.INTEGER,
      allowNull: true, // threshold might be optional
      defaultValue: 10
    },
    avgDailySales: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1
    },
    supplier_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  });

  return Product;
};
