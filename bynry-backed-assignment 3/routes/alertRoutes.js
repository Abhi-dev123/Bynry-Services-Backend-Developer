const express = require('express');
const router = express.Router();
const { getLowStockAlerts } = require('../controllers/alertController');

// Low stock alerts for company
router.get('/companies/:companyId/alerts/low-stock', getLowStockAlerts);

module.exports = router;
