# Smart Inventory System Architecture

This document describes the architecture of the Smart Inventory Management System.

The system is a full-stack web application that tracks products, warehouses, suppliers, and stock movements.

Technology Stack

Backend
Spring Boot REST API

Frontend
React Single Page Application

Database
PostgreSQL relational database

Communication
REST API with JSON responses

---

# High Level Architecture

React Frontend
↓
REST API
↓
Spring Boot Backend
↓
Service Layer
↓
Repository Layer
↓
PostgreSQL Database

---

# System Modules

Authentication Module

Handles:

User login
JWT token generation
Role-based authorization

---

Product Management Module

Handles:

Product creation
Product updates
Product deletion
Product search

---

Warehouse Module

Stores warehouse data.

Allows inventory tracking across multiple warehouses.

---

Inventory Module

Tracks product quantity per warehouse.

Handles stock increase and decrease operations.

---

Supplier Module

Stores supplier data.

Allows linking suppliers to products.

---

Stock Movement Module

Tracks all inventory operations.

Examples:

Supplier deliveries
Product shipments
Warehouse transfers

---

# Data Relationships

Product
One product can exist in many warehouses.

Warehouse
One warehouse stores many products.

Inventory
Connects Product and Warehouse.

Supplier
Suppliers provide products.

StockMovement
Tracks inventory changes.

---

# Data Flow Example

Example: Supplier delivery

1. Supplier delivers products.
2. System records stock movement.
3. Inventory quantity increases.
4. Dashboard updates product stock level.

---

# API Design

Backend exposes REST APIs under:

/api/

Examples:

/api/products
/api/inventory
/api/suppliers
/api/stock-movements
/api/auth

---

# Security Design

Authentication uses JWT tokens.

Flow:

User logs in
Server generates JWT token
Frontend stores token
Token sent in Authorization header

Authorization header format:

Bearer <token>

Protected endpoints require valid token.

---

# Frontend Architecture

React application uses component-based structure.

UI Layers:

Pages
Components
Services

Pages control application routes.

Components are reusable UI elements.

Services handle API calls.

---

# Error Handling

Backend returns structured errors.

Frontend displays user-friendly messages.

---

# Future Scalability

System architecture allows future expansion:

Multi warehouse management
Inventory analytics
Automated reorder systems
