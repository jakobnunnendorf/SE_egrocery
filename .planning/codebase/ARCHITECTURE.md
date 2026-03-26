# Architecture

**Analysis Date:** 2026-03-26

## Pattern Overview

**Overall:** Distributed three-tier architecture with multiple frontend implementations and a Python Flask backend

**Key Characteristics:**
- Separation of concerns: Frontend (React) and Backend (Flask API) with MongoDB
- Component-based UI architecture in React with modular components
- Multiple parallel implementations of frontend (React manual, generated TypeScript, HTML)
- RESTful API pattern for frontend-backend communication
- Monorepo structure containing all application layers

## Layers

**Frontend (React):**
- Purpose: User-facing web application with shopping cart, product browsing, and checkout
- Location: `frontend_react/`, `frontend_react_generated/`, `frontend_react_gen1440/`
- Contains: React components, pages, styled components, assets, Bootstrap integration
- Depends on: React 18, React Router, Axios (implied for API calls), Bootstrap, Stripe, EmailJS
- Used by: Browser clients
- Key features: Product catalog display, cart management, user authentication UI, checkout flow

**Backend (API):**
- Purpose: Product retrieval, cart validation, purchase processing, database persistence
- Location: `/backend/api_be.py`
- Contains: Flask endpoints for products, categories, cart, purchases
- Depends on: Flask, MongoDB, PyMongo
- Used by: Frontend via HTTP/REST
- Key features: Product filtering, stock validation, purchase transaction processing

**Data Layer:**
- Purpose: Persistent storage of products, user accounts, transactions
- Location: MongoDB (mongodb://localhost:27017/)
- Contains: Product catalog, user accounts, order history, stock levels
- Depends on: MongoDB server
- Used by: Backend API

## Data Flow

**Product Browsing Flow:**

1. Frontend renders product catalog using pre-loaded data or fetches via API
2. User selects filter parameters (category, price, etc.)
3. Frontend sends filter object to `/products` endpoint
4. Backend queries MongoDB collection with filter object
5. Backend returns filtered product list as JSON
6. Frontend displays products in CSS grid layout

**Shopping Cart Flow:**

1. User adds items to cart using `addItemToCart(product)` function in `App.js`
2. Cart state maintained in React component: `cartProp` array with product info and quantity
3. User modifies quantities using `removeItemFromCart(product)` or adds more items
4. Cart operations trigger local state updates (no server sync during editing)
5. On checkout, React sends cart items to `/purchase` endpoint

**Purchase Flow:**

1. Frontend collects user information, payment method, calculates total
2. Frontend creates order object with cart items
3. POST request sent to `/purchase` endpoint with cart_items JSON
4. Backend validates stock availability for each item
5. Backend updates product stock in MongoDB for available items
6. Backend returns list of successfully purchased items
7. Frontend displays confirmation page and triggers confirmation email

**State Management:**

- Frontend: React component state using `useState` hook
- Cart state: `cartProp` array in App component containing item quantity and product info
- User authentication state: `accountStatus` boolean flag
- Search results state: `searchResults` array for displaying filtered products
- Backend: Stateless request-response processing; state persisted in MongoDB

## Key Abstractions

**Component Hierarchy (Generated TypeScript):**
- Purpose: Modular UI composition with clear parent-child relationships
- Examples: `FrameComponent` (page root), `HeaderContainer` (header), `EGroceryContainer` (product grid), `ItemContainer` (individual product card)
- Pattern: Function components with TypeScript FunctionComponent type, CSS Module styling per component

**Endpoint Abstraction:**
- Purpose: Encapsulate business logic for each feature domain
- Examples: `/products` (retrieval with filtering), `/categories` (category listing), `/cart` (cart validation), `/purchase` (transaction processing)
- Pattern: Flask route decorators mapping HTTP methods to handler functions

**Cart Item Representation:**
- Format: `{ productInfo: product, quantity: number }`
- Used by: Frontend cart operations, purchase submission
- Validation: Stock checked at purchase time against MongoDB

## Entry Points

**Frontend (Browser):**
- Location: `frontend_react/src/index.js` or `frontend_react_generated/src/index.tsx`
- Triggers: User navigates to application URL
- Responsibilities: Render React app, initialize routing, set up global styles

**Backend (Server):**
- Location: `/backend/api_be.py` line 77
- Triggers: `if __name__ == '__main__': app.run(debug=True)`
- Responsibilities: Start Flask development server on localhost, listen for requests

**App Component (Frontend Root):**
- Location: `frontend_react/src/App.js` for manual implementation, `frontend_react_generated/src/App.tsx` for generated
- Triggers: Rendered by index entry point
- Responsibilities: Manage global state (cart, auth, search), render layout (Header/Body/Footer), handle cart operations

## Error Handling

**Strategy:** Minimal error handling currently implemented

**Patterns:**
- Backend: No visible error handling; assumes valid requests
- Frontend: No explicit error boundary components
- Database: No transaction rollback or failure recovery
- Network: No retry logic or timeout handling visible

## Cross-Cutting Concerns

**Logging:** Not implemented; Flask debug mode provides server logs

**Validation:**
- Stock availability checked at purchase time
- No input validation on filter parameters
- No email validation on registration (implied but not visible)

**Authentication:**
- Frontend: `accountStatus` boolean state flag
- Backend: No authentication endpoints visible
- No JWT or session tokens implemented

**Styling:**
- Global CSS with CSS variables in `/frontend_react_generated/src/global.css`
- CSS Modules for component-specific styles (`.module.css` files)
- Bootstrap for layout and responsive design in manual React implementation
- Custom fonts: Unbounded, Manrope, Monaco

---

*Architecture analysis: 2026-03-26*
