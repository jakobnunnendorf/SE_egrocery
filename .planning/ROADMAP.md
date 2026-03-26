# Roadmap: eGrocery Rebuild

**Created:** 2026-03-26
**Milestone:** v1.0 — Production-Ready E-Commerce App

## Phase Overview

| Phase | Name | Requirements | Depends On |
|-------|------|-------------|------------|
| 1 | Backend Foundation | FOUND-01..06, FOUND-10, DOCS-01..03, SECR-01 | — |
| 2 | Frontend Foundation | FOUND-07..09 | — |
| 3 | Authentication | AUTH-01..08, DOCS-04, SECR-02..04 | Phase 1 |
| 4 | Product Catalog | PROD-01..08 | Phase 1, Phase 2 |
| 5 | Shopping Cart | CART-01..07 | Phase 2, Phase 3 |
| 6 | Checkout & Payments | CHKT-01..06, SECR-06 | Phase 3, Phase 5 |
| 7 | User Accounts | ACCT-01..05 | Phase 3 |
| 8 | Admin Panel | ADMN-01..07 | Phase 3, Phase 4 |
| 9 | Testing Suite | TEST-01..05 | Phase 1..8 |
| 10 | Infrastructure & Hardening | INFR-01..05, SECR-05 | Phase 1..8 |

## Dependency Graph

```
Phase 1 (Backend) ──┬──→ Phase 3 (Auth) ──┬──→ Phase 5 (Cart) ──→ Phase 6 (Checkout)
                    │                      ├──→ Phase 7 (Accounts)
                    │                      └──→ Phase 8 (Admin) ←── Phase 4
Phase 2 (Frontend) ─┼──→ Phase 4 (Products)
                    │
                    └──→ Phase 5 (Cart)

Phases 1 & 2 can run in parallel.
Phases 4 & 3 can run in parallel (after their deps).
Phases 7 & 8 can run in parallel.
Phase 9 (Testing) and Phase 10 (Infra) run last.
```

---

## Phase 1: Backend Foundation

**Goal:** Rebuild Flask API from scratch with proper architecture, validation, and OpenAPI docs.

**Requirements:** FOUND-01, FOUND-02, FOUND-03, FOUND-04, FOUND-05, FOUND-06, FOUND-10, DOCS-01, DOCS-02, DOCS-03, SECR-01

**What gets built:**
- Application factory pattern (`create_app()`) with config classes (dev/test/prod)
- Blueprint structure: `api/products`, `api/auth`, `api/cart`, `api/orders`, `api/admin`
- flask-smorest integration with marshmallow schemas for all input validation
- Centralized error handler returning consistent `{error, message, status}` JSON
- MongoDB connection manager with PyMongo, proper connection pooling
- ObjectId JSON serialization (custom encoder)
- Ruff configuration for Python linting/formatting
- Swagger UI at `/api/docs` with auto-generated OpenAPI spec
- Environment-based configuration (`.env` + `python-dotenv`)

**Acceptance criteria:**
- `GET /api/docs` renders Swagger UI
- All endpoints reject malformed input with 400 + validation errors
- `flask run` starts cleanly with factory pattern
- Ruff passes with zero warnings
- No hardcoded secrets in code

**Estimated complexity:** Medium-High

---

## Phase 2: Frontend Foundation

**Goal:** Consolidate into single clean React app with modern patterns.

**Requirements:** FOUND-07, FOUND-08, FOUND-09

**What gets built:**
- New React app (Create React App or Vite) consolidating best parts of existing frontends
- Component folder structure: `components/`, `pages/`, `stores/`, `api/`, `hooks/`
- Zustand stores: `useCartStore`, `useAuthStore`
- Axios API client with base URL config, interceptors for auth + error handling
- Reusable layout components: Header, Footer, Sidebar, PageContainer
- React Router v6 setup with route structure
- ESLint + Prettier configuration
- Preserve existing visual style (Bootstrap + custom CSS)

**Acceptance criteria:**
- App renders with header/footer layout matching current design
- Route navigation works (home, products, cart, account, admin)
- Zustand stores function (cart add/remove persists to localStorage)
- Axios client can hit backend endpoints
- ESLint + Prettier pass with zero warnings

**Estimated complexity:** Medium

---

## Phase 3: Authentication

**Goal:** Implement real JWT-based authentication replacing the boolean flag.

**Requirements:** AUTH-01..08, DOCS-04, SECR-02, SECR-03, SECR-04

**What gets built:**
- **Backend:** Flask-JWT-Extended with access token (short-lived) + refresh token (httpOnly cookie)
- **Backend:** User model with bcrypt password hashing, email uniqueness validation
- **Backend:** Endpoints: `POST /auth/register`, `POST /auth/login`, `POST /auth/refresh`, `POST /auth/logout`
- **Backend:** `@jwt_required()` and `@admin_required` decorators
- **Backend:** Flask-CORS config with credentials support
- **Backend:** Flask-Limiter rate limiting on auth endpoints
- **Frontend:** Login and Signup pages with form validation
- **Frontend:** `useAuthStore` with user state, login/logout actions
- **Frontend:** Axios interceptor for silent token refresh on 401
- **Frontend:** Protected route wrapper component
- **Frontend:** Auth state persistence via refresh token (not localStorage)

**Acceptance criteria:**
- User can register, login, and see protected content
- Invalid credentials return 401 with clear error message
- Token refreshes silently without user interaction
- Logout clears all auth state and cookies
- Admin-only endpoints reject non-admin users with 403
- Auth endpoints rate-limited (e.g., 5 attempts/minute)

**Estimated complexity:** High

---

## Phase 4: Product Catalog

**Goal:** Full-featured product browsing with search, filter, sort, and pagination.

**Requirements:** PROD-01..08

**What gets built:**
- **Backend:** `GET /api/products` with query params: `page`, `per_page`, `category`, `min_price`, `max_price`, `search`, `sort`, `in_stock`
- **Backend:** `GET /api/products/<id>` for product detail
- **Backend:** `GET /api/categories` for category list
- **Backend:** MongoDB text index on product name/description for search
- **Backend:** Pagination response format: `{items, total, page, per_page, pages}`
- **Frontend:** Product grid page with responsive card layout
- **Frontend:** Filter sidebar (categories, price range, availability)
- **Frontend:** Search bar with debounced input
- **Frontend:** Sort dropdown (name, price asc/desc, newest)
- **Frontend:** Pagination controls
- **Frontend:** Product detail page
- **Frontend:** Image display with fallback placeholder

**Acceptance criteria:**
- Products page loads with paginated results
- Filtering by category narrows results correctly
- Search finds products by name
- Sorting changes result order
- Product detail page shows full information
- Responsive layout works on mobile/tablet/desktop

**Estimated complexity:** Medium-High

---

## Phase 5: Shopping Cart

**Goal:** Full cart functionality with Zustand state management and stock validation.

**Requirements:** CART-01..07

**What gets built:**
- **Frontend:** `useCartStore` with add, remove, update quantity, clear actions
- **Frontend:** Cart items store product snapshots (name, price, image URL)
- **Frontend:** Zustand `persist` middleware for localStorage persistence
- **Frontend:** Cart page with item list, quantity controls, running total
- **Frontend:** Cart icon in header with item count badge
- **Frontend:** "Add to cart" button on product cards and detail page
- **Backend:** `POST /api/cart/validate` endpoint — checks stock for all cart items
- **Frontend:** Stock validation before proceeding to checkout

**Acceptance criteria:**
- Adding product to cart updates header count and cart page
- Quantity can be increased/decreased; removing sets quantity to 0 removes item
- Cart survives page refresh (localStorage)
- Cart total recalculates on any change
- Stock validation warns about unavailable items before checkout

**Estimated complexity:** Medium

---

## Phase 6: Checkout & Payments

**Goal:** Stripe-powered checkout with webhook-based order fulfillment.

**Requirements:** CHKT-01..06, SECR-06

**What gets built:**
- **Frontend:** Checkout page with shipping address form
- **Frontend:** Order summary review before payment
- **Backend:** `POST /api/checkout/create-session` — creates Stripe Checkout Session with cart items
- **Backend:** `POST /api/webhooks/stripe` — handles `checkout.session.completed` event
- **Backend:** Webhook verifies Stripe signature before processing
- **Backend:** Order creation with product snapshots (name, price at time of purchase)
- **Backend:** Atomic stock decrement on successful payment
- **Backend:** Order status: `pending` → `paid` → `processing`
- **Frontend:** Success page after Stripe redirect
- **Frontend:** Cancelled payment handling (return to cart)

**Acceptance criteria:**
- User can enter shipping info and proceed to Stripe
- Stripe Checkout Session creates correctly with line items
- Webhook creates order and decrements stock on payment success
- Cancelled payments leave cart intact, no order created
- Order stored with product snapshots (not references)
- Webhook rejects unsigned/tampered requests

**Estimated complexity:** High

---

## Phase 7: User Accounts

**Goal:** Account management with order history.

**Requirements:** ACCT-01..05

**What gets built:**
- **Frontend:** Account page with profile section
- **Frontend:** Profile edit form (name, email) with validation
- **Frontend:** Change password form (current + new password)
- **Frontend:** Order history list with status, date, total
- **Frontend:** Order detail page with line items and shipping info
- **Backend:** `GET /api/users/me` — current user profile
- **Backend:** `PUT /api/users/me` — update profile
- **Backend:** `PUT /api/users/me/password` — change password
- **Backend:** `GET /api/orders` — user's order history (paginated)
- **Backend:** `GET /api/orders/<id>` — order detail (own orders only)

**Acceptance criteria:**
- User can view and update their profile
- Password change requires correct current password
- Order history shows all past orders with correct totals
- Order detail shows individual items and shipping address
- Users can only see their own orders

**Estimated complexity:** Medium

---

## Phase 8: Admin Panel

**Goal:** Product and order management for store administrators.

**Requirements:** ADMN-01..07

**What gets built:**
- **Frontend:** Admin layout with sidebar navigation (Dashboard, Products, Orders)
- **Frontend:** Admin dashboard with summary stats (product count, order count, revenue)
- **Frontend:** Product management table with pagination
- **Frontend:** Product create/edit form with image upload
- **Frontend:** Product delete with confirmation dialog
- **Frontend:** Order management table with status filter
- **Frontend:** Order status update controls
- **Backend:** `GET /api/admin/products` — all products (admin, paginated)
- **Backend:** `POST /api/admin/products` — create product
- **Backend:** `PUT /api/admin/products/<id>` — update product
- **Backend:** `DELETE /api/admin/products/<id>` — soft delete product
- **Backend:** `GET /api/admin/orders` — all orders (admin, paginated, filterable)
- **Backend:** `PUT /api/admin/orders/<id>/status` — update order status
- **Backend:** `GET /api/admin/stats` — dashboard statistics

**Acceptance criteria:**
- Admin can CRUD products (create, read, update, soft-delete)
- Admin can view and filter all orders
- Admin can update order status
- Dashboard shows accurate stats
- Non-admin users get 403 on all admin endpoints
- Admin routes protected in frontend (redirect to home)

**Estimated complexity:** High

---

## Phase 9: Testing Suite

**Goal:** Comprehensive test coverage across backend and frontend.

**Requirements:** TEST-01..05

**What gets built:**
- **Backend:** pytest configuration with fixtures for app, client, auth tokens, test DB
- **Backend:** Unit tests for marshmallow schemas, utility functions, decorators
- **Backend:** Integration tests for all API endpoints (using Docker MongoDB)
- **Frontend:** React Testing Library tests for key components (ProductCard, Cart, Login, etc.)
- **Frontend:** Zustand store unit tests
- **E2E:** Playwright tests for critical user flows: browse → cart → checkout, register → login, admin CRUD
- **Config:** Test scripts in `package.json` and `pyproject.toml`
- **Config:** Coverage reporting (pytest-cov, coverage thresholds)

**Acceptance criteria:**
- `pytest` runs all backend tests green
- `npm test` runs all frontend tests green
- `npx playwright test` runs E2E tests green
- Coverage report generated for both frontend and backend
- Critical user flows covered by E2E tests

**Estimated complexity:** High

---

## Phase 10: Infrastructure & Hardening

**Goal:** Dockerized deployment and security hardening.

**Requirements:** INFR-01..05, SECR-05

**What gets built:**
- **Docker:** `Dockerfile` for Flask backend (multi-stage: build + production)
- **Docker:** `Dockerfile` for React frontend (multi-stage: build + nginx)
- **Docker:** `docker-compose.yml` with services: frontend, backend, mongodb
- **Docker:** MongoDB healthcheck with `mongosh` (not deprecated `mongo`)
- **Docker:** `depends_on` with `condition: service_healthy` for startup ordering
- **Docker:** `.env.example` with all required environment variables documented
- **Docker:** Dev vs prod profiles via docker-compose override
- **Security:** Flask-Talisman for security headers (CSP, HSTS, X-Frame-Options)
- **Data:** Seed script (`seed.py`) to populate MongoDB with sample products, categories, admin user

**Acceptance criteria:**
- `docker compose up` starts entire stack from clean state
- Frontend accessible at `localhost:3000`, API at `localhost:5000`
- MongoDB starts and passes healthcheck before Flask connects
- Seed script creates sample data on first run
- Security headers present on all responses
- `.env.example` documents all required variables

**Estimated complexity:** Medium-High

---

## Milestone Success Criteria

The v1.0 milestone is complete when:

1. All 68 v1 requirements are checked off
2. A new user can: browse products → search/filter → add to cart → checkout with Stripe → view order history
3. An admin can: manage products → view/update orders → see dashboard stats
4. `docker compose up` starts the entire stack
5. Test suite passes with reasonable coverage
6. Swagger docs accessible and accurate
7. No known security vulnerabilities (no injection, proper auth, rate limiting)

---
*Roadmap created: 2026-03-26*
*Last updated: 2026-03-26 after initial definition*
