const express = require('express');
const router = express.Router();
const warehouseController = require('../controllers/warehouseController');

// Create a new warehouse
router.post('/warehouses', warehouseController.createWarehouse);

// Get all warehouses
router.get('/warehouses', warehouseController.getAllWarehouses);

// Get a specific warehouse by ID
router.get('/warehouses/:id', warehouseController.getWarehouseById);

// Update warehouse
router.put('/warehouses/:id', warehouseController.updateWarehouse);

// Delete warehouse
router.delete('/warehouses/:id', warehouseController.deleteWarehouse);

module.exports = router;
