// models/supplier.js
module.exports = (sequelize, DataTypes) => {
  const Supplier = sequelize.define('Supplier', {
    name: DataTypes.STRING,
    contact_email: DataTypes.STRING
  });

  Supplier.associate = models => {
    Supplier.hasMany(models.Product, { foreignKey: 'supplier_id' });
  };

  return Supplier;
};
