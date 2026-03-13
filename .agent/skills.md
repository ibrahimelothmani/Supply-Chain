# Agent Skills: Smart Inventory Management System

This agent assists in building a **modern full-stack Smart Inventory Management System**.

Technology stack:

Backend

* Spring Boot 4.0.3
* Spring Security
* Spring Data JPA
* Hibernate
* PostgreSQL

Frontend

* React 19
* React Router
* Axios
* TailwindCSS

The system manages inventory across warehouses and suppliers.

The agent must follow **clean architecture, REST API design, and modular frontend structure**.

---

# Backend Skills

## Backend Architecture

The backend must follow a layered architecture.

Structure:

src/main/java/com/inventory

config/
controller/
service/
repository/
entity/
dto/
mapper/
exception/
security/
util/

Rules:

Controllers
Handle HTTP requests and responses only.

Services
Contain business logic.

Repositories
Handle database access using Spring Data JPA.

DTOs
Used for API request and response.

Entities
Represent database tables.

Mappers
Convert entities to DTOs and DTOs to entities.

Exceptions
Handle application errors.

Security
Authentication and authorization configuration.

---

# REST API Design

The API must follow REST standards.

Examples:

GET /api/products
GET /api/products/{id}
POST /api/products
PUT /api/products/{id}
DELETE /api/products/{id}

Use proper HTTP status codes.

200 OK
201 CREATED
400 BAD REQUEST
401 UNAUTHORIZED
403 FORBIDDEN
404 NOT FOUND
500 INTERNAL SERVER ERROR

Responses must be returned as JSON.

Example response format:

{
"timestamp": "...",
"status": 200,
"message": "Success",
"data": {}
}

---

# Core Entities

## Product

Represents items stored in warehouses.

Fields:

* id
* name
* sku
* description
* category
* price
* reorderLevel
* createdAt
* updatedAt

---

## Warehouse

Represents a physical warehouse.

Fields:

* id
* name
* location
* capacity

---

## Inventory

Tracks product quantity in warehouses.

Fields:

* id
* product
* warehouse
* quantity
* lastUpdated

---

## Supplier

Represents suppliers that provide products.

Fields:

* id
* name
* email
* phone
* address

---

## StockMovement

Tracks inventory changes.

Fields:

* id
* product
* warehouse
* movementType
* quantity
* reference
* createdAt

movementType values:

INBOUND
OUTBOUND
TRANSFER

---

## User

System users.

Fields:

* id
* username
* email
* password
* role
* createdAt

Roles:

ADMIN
MANAGER
EMPLOYEE

---

# Business Logic Skills

## Product Management

Features:

Create product
Update product
Delete product
Search products
Filter by category

---

## Inventory Management

The system tracks product quantities in warehouses.

Rules:

When stock is added → increase inventory.

When stock is removed → decrease inventory.

If quantity < reorderLevel → mark as LOW STOCK.

---

## Stock Movement

Every inventory change must create a movement record.

Examples:

Inbound shipment
Customer order
Internal warehouse transfer

---

## Supplier Management

Suppliers can be linked to products.

Each supplier stores contact details.

---

# Validation

All API requests must be validated.

Use annotations:

@NotNull
@NotBlank
@Email
@Min
@Size

Invalid requests must return structured error responses.

---

# Exception Handling

Implement global exception handling.

Use:

@ControllerAdvice

Handle:

ResourceNotFoundException
ValidationException
AuthenticationException
GenericException

---

# Security Skills

Authentication system must use:

Spring Security
JWT tokens

Features:

Login endpoint
Token generation
Token validation
Role-based access control

Protected endpoints require authentication.

---

# Frontend Skills

Frontend must use React functional components and hooks.

Libraries:

React Router
Axios

---

# Frontend Structure

src/

components/
pages/
services/
hooks/
utils/

components/

Navbar
Sidebar
ProductTable
InventoryCard
SupplierForm
StockMovementTable

pages/

LoginPage
DashboardPage
ProductsPage
InventoryPage
SuppliersPage

services/

api.js
productService.js
inventoryService.js
supplierService.js
authService.js

---

# Frontend Features

Dashboard

Displays:

Total products
Low stock items
Inventory charts

---

Products Page

CRUD operations for products.

Features:

Search
Filter
Pagination

---

Inventory Page

Displays inventory per warehouse.

Columns:

Product
Warehouse
Quantity
Status

Status indicators:

Green → healthy
Yellow → low
Red → critical

---

Suppliers Page

Manage supplier information.

Create
Edit
Delete
View linked products

---

# Code Quality

Always:

Use meaningful names
Write small reusable functions
Follow SOLID principles

Avoid:

Business logic in controllers
Duplicated code
Large files
