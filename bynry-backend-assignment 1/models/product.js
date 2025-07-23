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
    }
  });

  return Product;
};
