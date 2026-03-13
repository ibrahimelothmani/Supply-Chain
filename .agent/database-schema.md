# Smart Inventory System Database Schema

This document defines the database schema for the Smart Inventory Management System.

Database Type
PostgreSQL relational database.

All tables should use normalized relational design with clear relationships.

Primary keys use auto-generated IDs.

Timestamps should be used to track record creation and updates.

---

# Tables Overview

Main tables in the system:

users
products
warehouses
inventory
suppliers
stock_movements

These tables represent the core data required for managing inventory operations.

---

# Users Table

Stores application users.

Fields

id
Primary key

username
Unique username used for login

email
Unique user email

password
Encrypted password

role
User role

created_at
Timestamp of account creation

updated_at
Timestamp of last update

Roles

ADMIN
MANAGER
EMPLOYEE

Example structure

users

id
username
email
password
role
created_at
updated_at

---

# Products Table

Stores products managed by the system.

Fields

id
Primary key

name
Product name

sku
Unique product identifier

description
Product description

category
Product category

price
Product unit price

reorder_level
Minimum stock level before alert

created_at
Timestamp

updated_at
Timestamp

Example structure

products

id
name
sku
description
category
price
reorder_level
created_at
updated_at

---

# Warehouses Table

Represents physical warehouse locations.

Fields

id
Primary key

name
Warehouse name

location
Physical address

capacity
Maximum storage capacity

created_at
Timestamp

Example structure

warehouses

id
name
location
capacity
created_at

---

# Inventory Table

Tracks product quantities in warehouses.

This table creates a relationship between products and warehouses.

Fields

id
Primary key

product_id
Reference to products table

warehouse_id
Reference to warehouses table

quantity
Current quantity available

last_updated
Timestamp of last inventory update

Example structure

inventory

id
product_id
warehouse_id
quantity
last_updated

Relationships

Many inventory records can reference one product.

Many inventory records can reference one warehouse.

---

# Suppliers Table

Stores supplier information.

Fields

id
Primary key

name
Supplier company name

email
Supplier contact email

phone
Supplier phone number

address
Supplier address

created_at
Timestamp

Example structure

suppliers

id
name
email
phone
address
created_at

---

# Stock Movements Table

Tracks every inventory change.

Each movement records stock entering or leaving a warehouse.

Fields

id
Primary key

product_id
Reference to product

warehouse_id
Reference to warehouse

movement_type
Type of stock operation

quantity
Quantity moved

reference
Optional description

created_at
Timestamp

Movement Types

INBOUND
OUTBOUND
TRANSFER

Example structure

stock_movements

id
product_id
warehouse_id
movement_type
quantity
reference
created_at

---

# Entity Relationships

User
Independent entity used for authentication.

Product
One product can appear in many inventory records.

Warehouse
One warehouse can store many inventory records.

Inventory
Links product and warehouse.

Supplier
Suppliers provide products.

StockMovement
Tracks every inventory update.

---

# Example Relationships Diagram

Product
1 → many Inventory

Warehouse
1 → many Inventory

Product
1 → many StockMovements

Warehouse
1 → many StockMovements

---

# Database Indexing

Indexes should be added for performance.

Recommended indexes

products.sku
products.category
inventory.product_id
inventory.warehouse_id
stock_movements.product_id
stock_movements.warehouse_id

---

# Data Integrity Rules

SKU must be unique.

Inventory quantity must never be negative.

Stock movement must always reference a valid product and warehouse.

User email must be unique.

---

# Example Business Flow

Supplier Delivery

1. Supplier delivers products.
2. System records a stock movement of type INBOUND.
3. Inventory quantity increases.
4. If inventory is above reorder level, status becomes normal.

---

# Future Expansion

The schema allows future improvements such as

product supplier mapping
inventory alerts
analytics tables
audit logs
