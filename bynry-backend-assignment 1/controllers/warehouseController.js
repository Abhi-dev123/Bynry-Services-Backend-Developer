const { Warehouse } = require('../models');

exports.createWarehouse = async (req, res) => {
  try {
    const warehouse = await Warehouse.create(req.body);
    res.status(201).json(warehouse);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create warehouse', details: error.message });
  }
};

exports.getAllWarehouses = async (req, res) => {
  try {
    const warehouses = await Warehouse.findAll();
    res.status(200).json(warehouses);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch warehouses', details: error.message });
  }
};

exports.getWarehouseById = async (req, res) => {
  try {
    const warehouse = await Warehouse.findByPk(req.params.id);
    if (!warehouse) return res.status(404).json({ error: 'Warehouse not found' });
    res.status(200).json(warehouse);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch warehouse', details: error.message });
  }
};

exports.updateWarehouse = async (req, res) => {
  try {
    const [updated] = await Warehouse.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ error: 'Warehouse not found' });
    const updatedWarehouse = await Warehouse.findByPk(req.params.id);
    res.status(200).json(updatedWarehouse);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update warehouse', details: error.message });
  }
};

exports.deleteWarehouse = async (req, res) => {
  try {
    const deleted = await Warehouse.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ error: 'Warehouse not found' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete warehouse', details: error.message });
  }
};
