module.exports = (sequelize, DataTypes) => {
  const Inventory = sequelize.define('Inventory', {
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    warehouse_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  return Inventory;
};
