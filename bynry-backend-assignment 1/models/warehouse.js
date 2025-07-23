module.exports = (sequelize, DataTypes) => {
  const Warehouse = sequelize.define('Warehouse', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  return Warehouse;
};
