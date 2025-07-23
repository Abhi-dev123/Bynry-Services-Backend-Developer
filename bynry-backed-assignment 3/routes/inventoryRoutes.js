const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');

// Add inventory entry
router.post('/inventory', inventoryController.addInventory);

// Get all inventory
router.get('/inventory', inventoryController.getAllInventory);

// Get inventory by warehouse
router.get('/inventory/warehouse/:warehouseId', inventoryController.getInventoryByWarehouse);

// Update inventory quantity
router.put('/inventory/:id', inventoryController.updateInventory);

// Delete inventory
router.delete('/inventory/:id', inventoryController.deleteInventory);

module.exports = router;
