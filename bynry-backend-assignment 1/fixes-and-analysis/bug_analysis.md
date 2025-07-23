## Issues Identified

| Issue | Description |
|-------|-------------|
|  SKU uniqueness is not enforced | No validation for duplicate SKUs |
|  Missing error handling | App crashes on bad requests |
|  No transaction wrap | Product and inventory creation may get out of sync |
|  Assumes all fields are present | Throws KeyError if missing |
|  Doesn’t check if warehouse_id is valid | Can cause foreign key constraint failures |
|  Products can exist in multiple warehouses | Code assumes single-warehouse mapping |
|  Price is not validated | Can be negative or non-numeric |
|  No response validation | May return partial success without errors |

---

##  Production Impact

| Issue | Production Impact |
|-------|-------------------|
| Duplicate SKU | Breaks DB integrity |
| No error handling | Server crashes, poor UX |
| No DB transaction | Inconsistent product/inventory records |
| Missing fields | Uncaught exceptions |
| Invalid warehouse_id | Foreign key constraint error |
| One-warehouse assumption | Can't scale to multi-warehouse |
| Invalid price input | Invalid product entries |
| Silent failures | Debugging becomes hard |

---

## Fixes Implemented

1. **Enforced SKU uniqueness** using Sequelize `unique: true` constraint.
2. **Added error handling** with try-catch blocks and `res.status().json()`.
3. **Used Sequelize transactions** to wrap product + inventory creation.
4. **Validated request body** with checks for missing fields.
5. **Checked warehouse existence** via `Warehouse.findByPk`.
6. **Allowed multi-warehouse products** using join table logic (if required).
7. **Validated price input**: must be a number ≥ 0.
8. **Returned detailed responses** on success/failure.

See the corrected code in: `backend/routes/productRoutes.js`, `controllers/productController.js`
