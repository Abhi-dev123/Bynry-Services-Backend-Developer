const { Inventory, Product, Warehouse } = require('../models');

exports.addInventory = async (req, res) => {
  try {
    const inventory = await Inventory.create(req.body);
    res.status(201).json(inventory);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add inventory', details: error.message });
  }
};

exports.getAllInventory = async (req, res) => {
  try {
    const inventory = await Inventory.findAll({ include: [Product, Warehouse] });
    res.status(200).json(inventory);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch inventory', details: error.message });
  }
};

exports.getInventoryByWarehouse = async (req, res) => {
  try {
    const inventory = await Inventory.findAll({
      where: { warehouse_id: req.params.warehouseId },
      include: [Product]
    });
    res.status(200).json(inventory);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch inventory for warehouse', details: error.message });
  }
};

exports.updateInventory = async (req, res) => {
  try {
    const [updated] = await Inventory.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ error: 'Inventory entry not found' });
    const updatedInventory = await Inventory.findByPk(req.params.id);
    res.status(200).json(updatedInventory);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update inventory', details: error.message });
  }
};

exports.deleteInventory = async (req, res) => {
  try {
    const deleted = await Inventory.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ error: 'Inventory entry not found' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete inventory', details: error.message });
  }
};
