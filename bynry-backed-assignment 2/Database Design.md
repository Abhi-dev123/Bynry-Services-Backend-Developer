#  StockFlow Database Schema Design


---

## 1. Schema (SQL DDL)

```sql
-- Company Table
CREATE TABLE Companies (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(255) NOT NULL,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL
);

-- Warehouse Table
CREATE TABLE Warehouses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id INTEGER NOT NULL,
    name VARCHAR(255) NOT NULL,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL,
    FOREIGN KEY (company_id) REFERENCES Companies(id) ON DELETE CASCADE
);

-- Supplier Table
CREATE TABLE Suppliers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(255),
    contact_email VARCHAR(255),
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL
);

-- Product Table
CREATE TABLE Products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(255) NOT NULL,
    sku VARCHAR(255) NOT NULL UNIQUE,
    price DECIMAL(10,2) NOT NULL,
    threshold INTEGER DEFAULT 10,
    avgDailySales INTEGER DEFAULT 1,
    supplier_id INTEGER,
    is_bundle BOOLEAN DEFAULT 0,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL,
    FOREIGN KEY (supplier_id) REFERENCES Suppliers(id) ON DELETE SET NULL
);

-- Inventory Table (product quantity per warehouse)
CREATE TABLE Inventories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER NOT NULL,
    warehouse_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL,
    FOREIGN KEY (product_id) REFERENCES Products(id) ON DELETE CASCADE,
    FOREIGN KEY (warehouse_id) REFERENCES Warehouses(id) ON DELETE CASCADE,
    UNIQUE (product_id, warehouse_id)
);

-- Inventory Logs (track changes)
CREATE TABLE InventoryLogs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER NOT NULL,
    warehouse_id INTEGER NOT NULL,
    change_type VARCHAR(50), -- e.g., 'addition', 'removal', 'adjustment'
    quantity_before INTEGER,
    quantity_after INTEGER,
    changed_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES Products(id),
    FOREIGN KEY (warehouse_id) REFERENCES Warehouses(id)
);

-- Product Bundles (many-to-many self reference)
CREATE TABLE ProductBundles (
    bundle_id INTEGER NOT NULL,
    component_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    PRIMARY KEY (bundle_id, component_id),
    FOREIGN KEY (bundle_id) REFERENCES Products(id),
    FOREIGN KEY (component_id) REFERENCES Products(id)
);

2.  Questions for Product Team (Gaps)
Can a product belong to multiple suppliers?

Are bundles sold separately or only as part of a larger item?

Should inventory logs also store who made the change (admin/user)?

Should we track expiry dates or batch numbers for products?

Do warehouses need geographic/location metadata?

Are products specific to companies or shared across the system?


                                
Decision	                                      Justification
UNIQUE(product_id, warehouse_id) in Inventories	 Prevents duplicate product entries per warehouse
InventoryLogs table	                             Enables tracking of stock movement for auditing
ProductBundles table	                         Handles self-referencing many-to-many bundles
ON DELETE CASCADE on Inventories, Warehouses	 Keeps orphan data from accumulating
threshold, avgDailySales in Products	         Required for low-stock alerts and forecasting
is_bundle flag in Products	                     Helps differentiate individual SKUs vs bundles
Normalized supplier and company relationships	 Ensures scalability and clean joins
