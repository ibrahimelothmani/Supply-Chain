# Coding Rules for Smart Inventory System

These rules must be followed when generating code.

---

# General Rules

Always prioritize:

Code readability
Maintainability
Modular architecture

Avoid:

Duplicated logic
Large files
Complex functions

---

# Backend Rules

Controllers must be thin.

Controllers only:

Receive requests
Call services
Return responses

Business logic must exist only in services.

Repositories must only handle database operations.

DTOs must be used for API communication.

Entities must not be exposed directly.

---

# Dependency Injection

Always use constructor injection.

Do not use field injection.

---

# Error Handling

All errors must be handled centrally using a global exception handler.

Never expose internal stack traces to API responses.

---

# Security Rules

Sensitive endpoints must require authentication.

Passwords must be stored securely.

JWT tokens must be validated for protected routes.

---

# Frontend Rules

Use functional React components.

Use hooks:

useState
useEffect
useContext

Avoid class components.

---

# API Calls

Components must not call APIs directly.

All API calls must be placed inside service files.

---

# UI Rules

Components must be reusable.

Pages must focus on layout and composition.

Avoid putting business logic inside UI components.

---

# Naming Conventions

Use clear names:

ProductService
InventoryController
SupplierRepository

Avoid abbreviations.

---

# Code Quality

Follow SOLID principles.

Prefer small methods.

Write clear and maintainable code.
