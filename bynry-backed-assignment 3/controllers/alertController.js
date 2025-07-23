const { Product, Inventory, Warehouse, Supplier } = require('../models');
const { Op } = require('sequelize');

exports.getLowStockAlerts = async (req, res) => {
  const companyId = req.params.companyId;

  try {
    const inventories = await Inventory.findAll({
      include: [
        {
          model: Product,
          include: [Supplier] // ✅ Nested include: Product → Supplier
        },
        {
          model: Warehouse // ✅ Inventory → Warehouse
        }
      ],
      where: {
        quantity: { [Op.gt]: 0 }
      }
    });

    const alerts = [];

    for (const inv of inventories) {
      const product = inv.Product;
      const warehouse = inv.Warehouse;

      // ✅ Simulate recent activity (updated in last 30 days)
      const recent = new Date(inv.updatedAt) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
      if (!recent || !product.threshold) continue;

      if (inv.quantity < product.threshold) {
        const daysUntilStockout = Math.floor(inv.quantity / (product.avgDailySales || 1));

        alerts.push({
          product_id: product.id,
          product_name: product.name,
          sku: product.sku,
          warehouse_id: warehouse.id,
          warehouse_name: warehouse.name,
          current_stock: inv.quantity,
          threshold: product.threshold,
          days_until_stockout: daysUntilStockout,
          supplier: {
            id: product.Supplier?.id || null,
            name: product.Supplier?.name || 'N/A',
            contact_email: product.Supplier?.contact_email || 'N/A'
          }
        });
      }
    }

    res.json({ alerts, total_alerts: alerts.length });
  } catch (err) {
    console.error('Low-stock alert error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
