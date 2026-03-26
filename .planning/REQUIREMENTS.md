# Requirements: eGrocery

**Defined:** 2026-03-26
**Core Value:** A complete, professional-quality e-commerce experience that demonstrates production-grade engineering practices.

## v1 Requirements

### Foundation (FOUND)

- [ ] **FOUND-01**: Project uses application factory pattern (`create_app()`) for Flask
- [ ] **FOUND-02**: Flask API organized with blueprints (products, auth, cart, orders, admin)
- [ ] **FOUND-03**: All endpoints validate input via marshmallow schemas (no raw `request.json` to DB)
- [ ] **FOUND-04**: Centralized error handling returns consistent JSON error responses
- [ ] **FOUND-05**: Environment variables manage all secrets and configuration (no hardcoded values)
- [ ] **FOUND-06**: MongoDB connection uses proper connection pooling and error handling
- [ ] **FOUND-07**: Frontend consolidated into single React app with clean component architecture
- [ ] **FOUND-08**: Zustand used for client state management (cart, auth)
- [ ] **FOUND-09**: Axios client configured with interceptors for auth and error handling
- [ ] **FOUND-10**: ESLint + Prettier configured for frontend; Ruff for backend

### Authentication (AUTH)

- [ ] **AUTH-01**: User can sign up with email and password (bcrypt hashed)
- [ ] **AUTH-02**: User can log in and receive JWT access token (in memory) + refresh token (httpOnly cookie)
- [ ] **AUTH-03**: Access token auto-refreshes silently via Axios interceptor on 401
- [ ] **AUTH-04**: User session persists across browser refresh (via refresh token cookie)
- [ ] **AUTH-05**: User can log out (token revoked, cookie cleared)
- [ ] **AUTH-06**: Protected API routes reject unauthenticated requests with 401
- [ ] **AUTH-07**: Admin role stored in JWT claims; `@admin_required` decorator on admin endpoints
- [ ] **AUTH-08**: Flask-CORS configured correctly with `withCredentials` support

### Product Catalog (PROD)

- [ ] **PROD-01**: Products API returns paginated results with total count
- [ ] **PROD-02**: Products can be filtered by category, price range, and availability
- [ ] **PROD-03**: Products can be searched by name using MongoDB text search
- [ ] **PROD-04**: Products can be sorted by name, price, or date added
- [ ] **PROD-05**: Product detail endpoint returns full product information
- [ ] **PROD-06**: Frontend displays product grid with responsive layout
- [ ] **PROD-07**: Frontend provides filter sidebar, search bar, sort dropdown, and pagination controls
- [ ] **PROD-08**: Product images display correctly with fallback for missing images

### Shopping Cart (CART)

- [ ] **CART-01**: User can add products to cart with quantity selection
- [ ] **CART-02**: User can update item quantities in cart
- [ ] **CART-03**: User can remove items from cart
- [ ] **CART-04**: Cart persists in Zustand with `persist` middleware (localStorage)
- [ ] **CART-05**: Cart displays item count in header and total price
- [ ] **CART-06**: Cart validates stock availability before checkout
- [ ] **CART-07**: Cart items store product snapshot (name, price, image) to avoid stale references

### Checkout (CHKT)

- [ ] **CHKT-01**: Checkout flow collects shipping address
- [ ] **CHKT-02**: Stripe Checkout Session created server-side, user redirected to Stripe
- [ ] **CHKT-03**: Stripe webhook handles payment confirmation and creates order
- [ ] **CHKT-04**: Order confirmation page displays after successful payment
- [ ] **CHKT-05**: Stock decremented atomically upon successful purchase
- [ ] **CHKT-06**: Failed/cancelled payments do not create orders or decrement stock

### User Accounts (ACCT)

- [ ] **ACCT-01**: User can view and edit profile (name, email)
- [ ] **ACCT-02**: User can change password
- [ ] **ACCT-03**: User can view order history with order details
- [ ] **ACCT-04**: Order history shows status, items, total, and date
- [ ] **ACCT-05**: User can view individual order detail page

### Admin Panel (ADMN)

- [ ] **ADMN-01**: Admin can view all products with pagination
- [ ] **ADMN-02**: Admin can create new products (name, description, price, category, stock, image)
- [ ] **ADMN-03**: Admin can edit existing products
- [ ] **ADMN-04**: Admin can delete products (soft delete or deactivate)
- [ ] **ADMN-05**: Admin can view all orders with status filtering
- [ ] **ADMN-06**: Admin can update order status (processing, shipped, delivered)
- [ ] **ADMN-07**: Admin dashboard shows basic stats (total products, orders, revenue)

### API Documentation (DOCS)

- [ ] **DOCS-01**: All endpoints documented with OpenAPI 3.x via flask-smorest
- [ ] **DOCS-02**: Swagger UI accessible at `/api/docs`
- [ ] **DOCS-03**: Request/response schemas visible in documentation
- [ ] **DOCS-04**: Authentication requirements documented per endpoint

### Testing (TEST)

- [ ] **TEST-01**: Backend unit tests with pytest (models, validation, utilities)
- [ ] **TEST-02**: Backend integration tests hitting real MongoDB (via Docker test container)
- [ ] **TEST-03**: Frontend component tests with React Testing Library
- [ ] **TEST-04**: E2E tests for critical flows (browse, cart, checkout, auth) with Playwright
- [ ] **TEST-05**: Test coverage reported and tracked

### Infrastructure (INFR)

- [ ] **INFR-01**: Docker Compose runs full stack (React, Flask, MongoDB) with single command
- [ ] **INFR-02**: Multi-stage Docker builds for production-optimized images
- [ ] **INFR-03**: MongoDB healthcheck prevents Flask startup race condition
- [ ] **INFR-04**: Environment variable configuration for dev/prod profiles
- [ ] **INFR-05**: Seed script populates MongoDB with sample product data

### Security (SECR)

- [ ] **SECR-01**: No NoSQL injection possible (all queries use validated schemas)
- [ ] **SECR-02**: Passwords hashed with bcrypt (min 12 rounds)
- [ ] **SECR-03**: CORS restricted to allowed origins
- [ ] **SECR-04**: Rate limiting on auth endpoints (Flask-Limiter)
- [ ] **SECR-05**: Security headers set via Flask-Talisman (CSP, HSTS, X-Frame-Options)
- [ ] **SECR-06**: Stripe webhook signature verified before processing

## v2 Requirements

### Enhanced Features

- **V2-01**: Email verification on signup
- **V2-02**: Password reset via email link
- **V2-03**: Guest cart that merges on login
- **V2-04**: Product reviews and ratings
- **V2-05**: Wishlist / saved items
- **V2-06**: Address book with multiple saved addresses
- **V2-07**: Order email notifications (confirmation, shipped, delivered)
- **V2-08**: Advanced search with autocomplete suggestions

### Operations

- **V2-09**: CI/CD pipeline (GitHub Actions)
- **V2-10**: Production logging and monitoring
- **V2-11**: Database backup strategy
- **V2-12**: Load testing results

## Out of Scope

| Feature | Reason |
|---------|--------|
| Mobile native app | Web-only for portfolio version |
| Multi-vendor marketplace | Single store, unnecessary complexity |
| Real-time features (chat, live inventory) | Not needed for grocery demo |
| Internationalization | English only |
| OAuth/social login | Email/password sufficient for v1 |
| Subscription/recurring orders | One-time purchase only |
| Recommendation engine | Over-engineered for portfolio scope |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| FOUND-01 | Phase 1 | Pending |
| FOUND-02 | Phase 1 | Pending |
| FOUND-03 | Phase 1 | Pending |
| FOUND-04 | Phase 1 | Pending |
| FOUND-05 | Phase 1 | Pending |
| FOUND-06 | Phase 1 | Pending |
| FOUND-07 | Phase 2 | Pending |
| FOUND-08 | Phase 2 | Pending |
| FOUND-09 | Phase 2 | Pending |
| FOUND-10 | Phase 1 | Pending |
| AUTH-01 | Phase 3 | Pending |
| AUTH-02 | Phase 3 | Pending |
| AUTH-03 | Phase 3 | Pending |
| AUTH-04 | Phase 3 | Pending |
| AUTH-05 | Phase 3 | Pending |
| AUTH-06 | Phase 3 | Pending |
| AUTH-07 | Phase 3 | Pending |
| AUTH-08 | Phase 3 | Pending |
| PROD-01 | Phase 4 | Pending |
| PROD-02 | Phase 4 | Pending |
| PROD-03 | Phase 4 | Pending |
| PROD-04 | Phase 4 | Pending |
| PROD-05 | Phase 4 | Pending |
| PROD-06 | Phase 4 | Pending |
| PROD-07 | Phase 4 | Pending |
| PROD-08 | Phase 4 | Pending |
| CART-01 | Phase 5 | Pending |
| CART-02 | Phase 5 | Pending |
| CART-03 | Phase 5 | Pending |
| CART-04 | Phase 5 | Pending |
| CART-05 | Phase 5 | Pending |
| CART-06 | Phase 5 | Pending |
| CART-07 | Phase 5 | Pending |
| CHKT-01 | Phase 6 | Pending |
| CHKT-02 | Phase 6 | Pending |
| CHKT-03 | Phase 6 | Pending |
| CHKT-04 | Phase 6 | Pending |
| CHKT-05 | Phase 6 | Pending |
| CHKT-06 | Phase 6 | Pending |
| ACCT-01 | Phase 7 | Pending |
| ACCT-02 | Phase 7 | Pending |
| ACCT-03 | Phase 7 | Pending |
| ACCT-04 | Phase 7 | Pending |
| ACCT-05 | Phase 7 | Pending |
| ADMN-01 | Phase 8 | Pending |
| ADMN-02 | Phase 8 | Pending |
| ADMN-03 | Phase 8 | Pending |
| ADMN-04 | Phase 8 | Pending |
| ADMN-05 | Phase 8 | Pending |
| ADMN-06 | Phase 8 | Pending |
| ADMN-07 | Phase 8 | Pending |
| DOCS-01 | Phase 1 | Pending |
| DOCS-02 | Phase 1 | Pending |
| DOCS-03 | Phase 1 | Pending |
| DOCS-04 | Phase 3 | Pending |
| TEST-01 | Phase 9 | Pending |
| TEST-02 | Phase 9 | Pending |
| TEST-03 | Phase 9 | Pending |
| TEST-04 | Phase 9 | Pending |
| TEST-05 | Phase 9 | Pending |
| INFR-01 | Phase 10 | Pending |
| INFR-02 | Phase 10 | Pending |
| INFR-03 | Phase 10 | Pending |
| INFR-04 | Phase 10 | Pending |
| INFR-05 | Phase 10 | Pending |
| SECR-01 | Phase 1 | Pending |
| SECR-02 | Phase 3 | Pending |
| SECR-03 | Phase 3 | Pending |
| SECR-04 | Phase 3 | Pending |
| SECR-05 | Phase 10 | Pending |
| SECR-06 | Phase 6 | Pending |

**Coverage:**
- v1 requirements: 68 total
- Mapped to phases: 68
- Unmapped: 0 ✓

---
*Requirements defined: 2026-03-26*
*Last updated: 2026-03-26 after initial definition*
