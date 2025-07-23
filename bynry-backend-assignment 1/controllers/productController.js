const { Product, Inventory } = require('../models');

exports.createProduct = async (req, res) => {
    try {
        const { name, sku, price, warehouse_id, initial_quantity } = req.body;

        if (!name || !sku || !price || !warehouse_id || !initial_quantity) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Check if SKU already exists
        const existing = await Product.findOne({ where: { sku } });
        if (existing) {
            return res.status(409).json({ error: 'SKU already exists' });
        }

        // Create product
        const product = await Product.create({ name, sku, price });

        // Create inventory entry
        await Inventory.create({
            product_id: product.id,
            warehouse_id,
            quantity: initial_quantity
        });

        return res.status(201).json({ message: 'Product created', product_id: product.id });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
    }
};
