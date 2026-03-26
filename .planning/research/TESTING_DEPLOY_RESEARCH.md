# Testing Strategy & Containerized Deployment Research

**Project:** SE_egrocery (React + Flask + MongoDB)
**Researched:** 2026-03-26
**Overall Confidence:** MEDIUM-HIGH (most claims verified through official docs or multiple sources)

---

## 1. Testing Strategy

### 1.1 Backend: pytest for Flask

**Recommendation:** pytest + pytest-flask + mongomock (unit/integration), real MongoDB container (E2E)

**Confidence:** HIGH — verified through Flask official docs, PyPI, and multiple community sources

#### Core fixture structure (conftest.py)

The application factory pattern is a prerequisite. Without it, creating isolated test app instances is painful.

```python
# tests/conftest.py
import pytest
from app import create_app

@pytest.fixture(scope="session")
def app():
    """Session-scoped app — created once for entire test run."""
    app = create_app({
        "TESTING": True,
        "MONGO_URI": "mongomock://localhost",  # in-memory MongoDB
    })
    yield app

@pytest.fixture(scope="function")
def client(app):
    """Function-scoped test client — fresh per test."""
    return app.test_client()

@pytest.fixture(scope="function")
def runner(app):
    """CLI runner for testing Flask CLI commands."""
    return app.test_cli_runner()
```

**Fixture scope guidance:**
- `session`: app instance, database schema, static data
- `module`: fixtures shared within a single test file
- `function` (default): anything that mutates state — use this for the test client and any seeded data
- `class`: rarely needed; use module instead

#### MongoDB isolation for Flask tests

Two strategies, pick based on test type:

**Strategy A — mongomock (unit and integration tests, no real Mongo needed)**

```python
# Install: pip install mongomock
# Set MONGO_URI = "mongomock://localhost" in test config
# mongomock.MongoClient behaves identically to pymongo.MongoClient
# in all nominal cases — CRUD, aggregation basics, indexes
```

Limitation: mongomock does not support all aggregation pipeline operators or change streams. Use it for 80% of tests and fall back to a real instance for pipeline-heavy tests.

**Strategy B — pytest-mongo (real MongoDB process per test session)**

```python
# Install: pip install pytest-mongo
# pytest-mongo spins up a real mongod process, session-scoped
# Provides a mongodb fixture with functional scope that wipes the DB between tests
```

Use when: tests exercise aggregation pipelines, transactions, or GridFS that mongomock doesn't support.

**Strategy C — Docker service in CI (integration tests)**

Use a `services: mongo:7` container in GitHub Actions. Connect via `MONGO_URI=mongodb://localhost:27017/test`. Drop the DB in a `teardown` fixture. This is the most realistic but also slowest option — reserve for integration test suite only.

#### Required packages

```
pytest>=8.0
pytest-flask>=1.3
pytest-cov>=5.0
mongomock>=4.1
factory-boy>=3.3       # test data factories
```

#### Test layout

```
tests/
  conftest.py           # shared fixtures
  unit/
    test_models.py      # model validation, business logic
    test_services.py    # service layer, mocked DB
  integration/
    test_routes.py      # route handlers, test client + mongomock
    test_auth.py
    test_payments.py    # Stripe webhook handler
  e2e/                  # Playwright (lives in frontend, runs against full stack)
```

#### Coverage configuration (pytest.ini or pyproject.toml)

```ini
[pytest]
testpaths = tests
addopts = --cov=app --cov-report=term-missing --cov-fail-under=80
```

---

### 1.2 Frontend: React Testing Library + Vitest

**Recommendation:** Vitest + @testing-library/react + @testing-library/user-event (if using Vite). Use Jest only if the project was bootstrapped with Create React App.

**Confidence:** HIGH — multiple 2025-2026 sources confirm Vitest is the correct pairing for Vite

#### Install (Vite project)

```bash
npm install -D vitest jsdom \
  @testing-library/react \
  @testing-library/user-event \
  @testing-library/jest-dom \
  @vitest/coverage-v8
```

#### vite.config.ts additions

```typescript
/// <reference types="vitest" />
export default defineConfig({
  // ... existing config
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      thresholds: { lines: 80, functions: 80 },
    },
  },
});
```

#### Setup file (src/test/setup.ts)

```typescript
import "@testing-library/jest-dom/vitest";
import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

afterEach(() => {
  cleanup();
});
```

#### Testing patterns

**Component test (user interaction focus):**

```typescript
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ProductCard } from "./ProductCard";

test("adds product to cart when button clicked", async () => {
  const user = userEvent.setup();
  const onAdd = vi.fn();

  render(<ProductCard product={mockProduct} onAddToCart={onAdd} />);

  await user.click(screen.getByRole("button", { name: /add to cart/i }));

  expect(onAdd).toHaveBeenCalledWith(mockProduct.id);
});
```

**Custom hook test (renderHook):**

```typescript
import { renderHook, act } from "@testing-library/react";
import { useCart } from "./useCart";

test("increments item quantity", () => {
  const { result } = renderHook(() => useCart());

  act(() => result.current.addItem({ id: "p1", quantity: 1 }));

  expect(result.current.items).toHaveLength(1);
});
```

**API call test (MSW recommended for mocking):**

```bash
npm install -D msw
```

Use MSW (Mock Service Worker) to intercept `fetch`/`axios` calls in tests without modifying production code. Define handlers in `src/test/handlers.ts` and activate in the Vitest setup file via a server fixture. This is strongly preferred over `vi.mock("axios")` which couples tests to implementation details.

**Key principles (verified against Testing Library guidance):**
- Query by role, label, or text — never by class name or test ID except as last resort
- Use `data-testid` only when no semantic query exists
- Test behavior, not implementation — avoid asserting on state variables
- Each test must be fully independent — no shared mutable state

---

### 1.3 E2E: Playwright

**Recommendation:** Playwright over Cypress for new projects in 2025-2026

**Rationale:**
- Native multi-browser support (Chromium, Firefox, WebKit) without paid tier
- Built-in auto-waiting eliminates most flakiness sources
- First-class TypeScript support
- `@playwright/test` ships as a unified test runner — no separate framework needed

**Confidence:** MEDIUM-HIGH — based on multiple 2025-2026 tutorials and the Playwright docs

#### Install

```bash
npx playwright install --with-deps
```

#### playwright.config.ts

```typescript
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: "html",
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "firefox", use: { ...devices["Desktop Firefox"] } },
  ],
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
  },
});
```

#### E2E test structure for e-grocery

```
e2e/
  auth.spec.ts          # login, register, session persistence
  product-browse.spec.ts # search, filter, product detail
  cart.spec.ts          # add/remove, quantity changes, persistence
  checkout.spec.ts      # address, payment form (Stripe test mode)
  order-history.spec.ts # post-purchase view
```

#### Critical E2E patterns

Always use `data-testid` attributes for E2E selectors (not CSS classes which change):

```typescript
// In component:
<button data-testid="add-to-cart-btn">Add to cart</button>

// In test:
await page.getByTestId("add-to-cart-btn").click();
```

For Stripe checkout in E2E tests, use Stripe test card numbers (`4242 4242 4242 4242`) against the test mode API. Never hardcode card numbers in source — read from environment:

```typescript
const STRIPE_TEST_CARD = process.env.STRIPE_TEST_CARD ?? "4242424242424242";
```

---

## 2. Docker Compose Deployment

### 2.1 Service Architecture

**Recommended topology:**

```
Internet → nginx (port 80/443)
            ├── / → React static files (served by nginx)
            └── /api/* → Flask backend (port 5000, internal only)
                          └── mongodb (port 27017, internal only)
```

The nginx container handles all ingress. The Flask and MongoDB containers are never exposed on the host, only accessible within the Docker network.

**Confidence:** HIGH — verified through Miguel Grinberg's Docker guide and official Docker Compose docs

### 2.2 Directory structure

```
project/
  frontend/
    Dockerfile
    nginx.conf
    src/
  backend/
    Dockerfile
    app/
    requirements.txt
  docker-compose.yml
  docker-compose.dev.yml
  docker-compose.prod.yml
  .env.example
```

### 2.3 Frontend Dockerfile (multi-stage)

```dockerfile
# frontend/Dockerfile

# ── Stage 1: Build ──────────────────────────────────────
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --frozen-lockfile
COPY . .
# Inject API URL at build time for Vite
ARG VITE_API_BASE_URL=/api
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
RUN npm run build

# ── Stage 2: Serve ──────────────────────────────────────
FROM nginx:1.27-alpine AS production
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
```

### 2.4 nginx.conf (SPA + API proxy)

```nginx
# frontend/nginx.conf
server {
  listen 80;
  root /usr/share/nginx/html;
  index index.html;

  # Gzip compression
  gzip on;
  gzip_types text/plain text/css application/json application/javascript text/xml application/xml;

  # React SPA: all non-asset requests serve index.html
  location / {
    try_files $uri $uri/ /index.html;
  }

  # Cache hashed static assets aggressively
  location ~* \.(js|css|png|jpg|gif|ico|svg|woff2)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
  }

  # Do not cache index.html
  location = /index.html {
    add_header Cache-Control "no-cache, no-store, must-revalidate";
  }

  # Proxy all /api calls to Flask
  location /api {
    proxy_pass         http://backend:5000;
    proxy_set_header   Host              $host;
    proxy_set_header   X-Real-IP         $remote_addr;
    proxy_set_header   X-Forwarded-For   $proxy_add_x_forwarded_for;
    proxy_set_header   X-Forwarded-Proto $scheme;
    # Strip /api prefix before forwarding to Flask
    rewrite ^/api/(.*)$ /$1 break;
  }
}
```

### 2.5 Backend Dockerfile

```dockerfile
# backend/Dockerfile

FROM python:3.12-slim AS base
WORKDIR /app
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

# Install dependencies separately to leverage layer cache
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Production: run with gunicorn (never use flask run in production)
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "--workers", "4", "--timeout", "120", "app:create_app()"]
```

### 2.6 docker-compose.yml (base / shared)

```yaml
# docker-compose.yml
version: "3.9"

services:
  mongodb:
    image: mongo:7
    restart: unless-stopped
    environment:
      MONGO_INITDB_ROOT_USERNAME: ${MONGO_ROOT_USER}
      MONGO_INITDB_ROOT_PASSWORD: ${MONGO_ROOT_PASSWORD}
      MONGO_INITDB_DATABASE: ${MONGO_DB}
    volumes:
      - mongo_data:/data/db
    healthcheck:
      # mongosh replaces deprecated mongo shell in MongoDB 6+
      test: ["CMD", "mongosh", "--eval", "db.adminCommand('ping')"]
      interval: 10s
      timeout: 5s
      retries: 5
      start_period: 20s

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    restart: unless-stopped
    environment:
      MONGO_URI: mongodb://${MONGO_ROOT_USER}:${MONGO_ROOT_PASSWORD}@mongodb:27017/${MONGO_DB}?authSource=admin
      SECRET_KEY: ${SECRET_KEY}
      STRIPE_SECRET_KEY: ${STRIPE_SECRET_KEY}
      STRIPE_WEBHOOK_SECRET: ${STRIPE_WEBHOOK_SECRET}
      FLASK_ENV: production
    depends_on:
      mongodb:
        condition: service_healthy   # wait until MongoDB passes healthcheck
    # NOT exposed — only reachable via nginx on the internal network

  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
      args:
        VITE_API_BASE_URL: /api
    restart: unless-stopped
    ports:
      - "80:80"
    depends_on:
      - backend

volumes:
  mongo_data:
```

### 2.7 docker-compose.dev.yml (development overrides)

```yaml
# docker-compose.dev.yml
# Usage: docker compose -f docker-compose.yml -f docker-compose.dev.yml up
version: "3.9"

services:
  mongodb:
    ports:
      - "27017:27017"  # expose for direct DB inspection in dev

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile.dev
    volumes:
      - ./backend:/app    # live reload via bind mount
    environment:
      FLASK_ENV: development
      FLASK_DEBUG: "1"
    ports:
      - "5000:5000"       # expose for direct curl/Postman access
    command: flask run --host=0.0.0.0 --port=5000 --reload

  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile.dev
    volumes:
      - ./frontend/src:/app/src   # hot module replacement
    ports:
      - "3000:3000"
    command: npm run dev -- --host 0.0.0.0
```

**Note:** The `backend/Dockerfile.dev` for development should use `flask run` instead of gunicorn and skip the multi-stage build to preserve fast iteration speed.

### 2.8 Critical: depends_on with healthcheck

The naive `depends_on: [mongodb]` only waits for the MongoDB container to start, not for `mongod` to be ready to accept connections. Flask will crash on startup if it connects before MongoDB is ready.

The correct pattern (shown above in docker-compose.yml) uses:

```yaml
depends_on:
  mongodb:
    condition: service_healthy
```

Combined with the `healthcheck` block on the MongoDB service, Docker Compose will not start the backend until MongoDB responds to a ping. This pattern is required — without it, startup race conditions will cause intermittent failures in CI and on cold starts.

---

## 3. Stripe Payment Integration

### 3.1 Recommended approach: Stripe Checkout (hosted page)

**Recommendation:** Use Stripe Checkout (hosted payment page) not a custom payment element for an e-grocery MVP.

**Rationale:**
- Stripe handles PCI compliance entirely — your server never touches raw card data
- Built-in support for 3D Secure, Apple Pay, Google Pay, Buy Now Pay Later
- Significantly less custom code to maintain and audit
- Upgrading to the embedded Payment Element is straightforward later if needed

**Confidence:** HIGH — verified against official Stripe documentation

### 3.2 Flask Blueprint for payments

Organize all payment routes in a blueprint to keep the codebase clean:

```python
# app/payments/routes.py
import stripe
from flask import Blueprint, request, jsonify, current_app
from app.models import Order
from app.extensions import mongo

payments_bp = Blueprint("payments", __name__, url_prefix="/payments")


@payments_bp.route("/create-checkout-session", methods=["POST"])
def create_checkout_session():
    """Create a Stripe Checkout Session for the current cart."""
    data = request.get_json()
    cart_items = data.get("items", [])

    line_items = [
        {
            "price_data": {
                "currency": "usd",
                "product_data": {"name": item["name"]},
                "unit_amount": int(item["price"] * 100),  # Stripe uses cents
            },
            "quantity": item["quantity"],
        }
        for item in cart_items
    ]

    session = stripe.checkout.Session.create(
        payment_method_types=["card"],
        line_items=line_items,
        mode="payment",
        success_url=f"{current_app.config['FRONTEND_URL']}/order/success?session_id={{CHECKOUT_SESSION_ID}}",
        cancel_url=f"{current_app.config['FRONTEND_URL']}/cart",
        metadata={"user_id": str(data.get("user_id"))},
    )

    return jsonify({"checkout_url": session.url})


@payments_bp.route("/webhook", methods=["POST"])
def stripe_webhook():
    """
    Receive and process Stripe webhook events.
    CRITICAL: Use request.get_data() (raw bytes), not request.json.
    Stripe signature verification requires the raw body.
    """
    payload = request.get_data()
    sig_header = request.headers.get("Stripe-Signature")

    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, current_app.config["STRIPE_WEBHOOK_SECRET"]
        )
    except (ValueError, stripe.error.SignatureVerificationError) as e:
        return jsonify({"error": str(e)}), 400

    if event["type"] == "checkout.session.completed":
        _fulfill_order(event["data"]["object"])
    elif event["type"] == "checkout.session.async_payment_succeeded":
        # Delayed payment methods (ACH, bank transfer) succeed asynchronously
        _fulfill_order(event["data"]["object"])
    elif event["type"] == "checkout.session.async_payment_failed":
        _handle_payment_failure(event["data"]["object"])

    return jsonify({"received": True}), 200


def _fulfill_order(session):
    """
    Idempotent order fulfillment.
    Called potentially multiple times for the same session — must be safe.
    """
    session_id = session["id"]

    # Idempotency check: skip if already processed
    if mongo.db.processed_events.find_one({"session_id": session_id}):
        return

    if session.get("payment_status") == "unpaid":
        return  # Not yet paid (async payment method still pending)

    user_id = session.get("metadata", {}).get("user_id")

    # Create order document
    mongo.db.orders.insert_one({
        "user_id": user_id,
        "stripe_session_id": session_id,
        "status": "confirmed",
        "amount_total": session["amount_total"],
        "currency": session["currency"],
    })

    # Mark event as processed (idempotency record)
    mongo.db.processed_events.insert_one({"session_id": session_id})
```

### 3.3 Environment variables required

```
STRIPE_SECRET_KEY=sk_test_...      # or sk_live_... in production
STRIPE_PUBLISHABLE_KEY=pk_test_... # sent to frontend
STRIPE_WEBHOOK_SECRET=whsec_...    # from Stripe dashboard or CLI
```

Never commit these. Load from environment or a secrets manager.

### 3.4 Local development webhook testing

Use the Stripe CLI to forward real test events to your local Flask server:

```bash
# Install Stripe CLI (macOS)
brew install stripe/stripe-cli/stripe

# Authenticate
stripe login

# Forward webhooks to local Flask
stripe listen --forward-to localhost:5000/payments/webhook

# In a separate terminal: trigger a test event
stripe trigger checkout.session.completed
```

The CLI prints a webhook signing secret (`whsec_...`) on startup — use that value for `STRIPE_WEBHOOK_SECRET` during local development.

### 3.5 Testing the webhook handler

```python
# tests/integration/test_payments.py
import json
import stripe
import pytest

def generate_stripe_signature(payload: bytes, secret: str) -> str:
    """Generate a valid Stripe webhook signature for testing."""
    import time, hmac, hashlib
    timestamp = int(time.time())
    sig = hmac.new(
        secret.encode(),
        f"{timestamp}.{payload.decode()}".encode(),
        hashlib.sha256,
    ).hexdigest()
    return f"t={timestamp},v1={sig}"


def test_webhook_fulfills_order(client, app):
    payload = json.dumps({
        "id": "evt_test_001",
        "type": "checkout.session.completed",
        "data": {
            "object": {
                "id": "cs_test_001",
                "payment_status": "paid",
                "amount_total": 4999,
                "currency": "usd",
                "metadata": {"user_id": "user_001"},
            }
        },
    }).encode()

    secret = app.config["STRIPE_WEBHOOK_SECRET"]
    sig = generate_stripe_signature(payload, secret)

    response = client.post(
        "/payments/webhook",
        data=payload,
        content_type="application/json",
        headers={"Stripe-Signature": sig},
    )
    assert response.status_code == 200


def test_webhook_idempotent(client, app):
    """Second call with same session ID must not create duplicate order."""
    # Call twice, assert only one order in DB
    ...
```

---

## 4. API Documentation with Flask

### 4.1 Recommendation: flask-smorest

**Recommendation:** flask-smorest over flasgger or flask-apispec.

**Rationale:**

| Criterion | flask-smorest | flasgger | flask-apispec |
|-----------|--------------|----------|---------------|
| OpenAPI version | 3.x | 2.0 (Swagger) | 2.0/3.x (limited) |
| Marshmallow integration | Native, first-class | Experimental | Partial |
| Active maintenance | Yes (marshmallow org) | Sporadic | Minimal |
| Validation | Request + Response | Request only | Request only |
| Blueprint support | Full | Manual | Manual |
| Spec UI options | ReDoc, Swagger UI, RapiDoc | Swagger UI | Swagger UI |

flask-smorest is maintained by the marshmallow team, generates OpenAPI 3.x (not the deprecated 2.0 Swagger format), and provides automatic request/response validation through marshmallow schemas. It is the correct choice for a modern Flask API.

**Confidence:** MEDIUM-HIGH — verified through flask-smorest official docs, PyPI, and APIFlask comparison page

### 4.2 Setup

```bash
pip install flask-smorest marshmallow
```

### 4.3 App factory integration

```python
# app/__init__.py
from flask import Flask
from flask_smorest import Api

def create_app(config=None):
    app = Flask(__name__)

    app.config.update({
        "API_TITLE": "E-Grocery API",
        "API_VERSION": "v1",
        "OPENAPI_VERSION": "3.0.3",
        "OPENAPI_URL_PREFIX": "/",
        "OPENAPI_SWAGGER_UI_PATH": "/docs",
        "OPENAPI_SWAGGER_UI_URL": "https://cdn.jsdelivr.net/npm/swagger-ui-dist/",
        "OPENAPI_REDOC_PATH": "/redoc",
        "OPENAPI_REDOC_URL": "https://cdn.jsdelivr.net/npm/redoc/bundles/redoc.standalone.js",
    })

    if config:
        app.config.update(config)

    api = Api(app)

    from app.products.routes import products_bp
    from app.orders.routes import orders_bp
    from app.payments.routes import payments_blp

    api.register_blueprint(products_bp)
    api.register_blueprint(orders_bp)
    # Note: payments webhook must NOT use @blp.arguments (needs raw body)

    return app
```

### 4.4 Schema and route pattern

```python
# app/products/schemas.py
from marshmallow import Schema, fields, validate

class ProductSchema(Schema):
    id = fields.Str(dump_only=True)         # only in responses, never in request body
    name = fields.Str(required=True, validate=validate.Length(min=1, max=200))
    price = fields.Float(required=True, validate=validate.Range(min=0))
    category = fields.Str(required=True)
    stock = fields.Int(load_default=0)
    image_url = fields.Url(load_default=None)


class ProductQuerySchema(Schema):
    """Query string parameters for product listing."""
    category = fields.Str(load_default=None)
    search = fields.Str(load_default=None)
    page = fields.Int(load_default=1, validate=validate.Range(min=1))
    per_page = fields.Int(load_default=20, validate=validate.Range(min=1, max=100))
```

```python
# app/products/routes.py
from flask_smorest import Blueprint
from app.products.schemas import ProductSchema, ProductQuerySchema

products_bp = Blueprint(
    "products", __name__, url_prefix="/products", description="Product catalog"
)


@products_bp.route("/")
@products_bp.arguments(ProductQuerySchema, location="query")
@products_bp.response(200, ProductSchema(many=True))
def list_products(query_args):
    """List products with optional filtering."""
    # query_args is pre-validated dict
    # return list of product dicts — marshmallow serializes them
    ...


@products_bp.route("/<product_id>")
@products_bp.response(200, ProductSchema)
@products_bp.alt_response(404, description="Product not found")
def get_product(product_id):
    """Get a single product by ID."""
    ...


@products_bp.route("/", methods=["POST"])
@products_bp.arguments(ProductSchema)
@products_bp.response(201, ProductSchema)
def create_product(product_data):
    """Create a new product. Admin only."""
    ...
```

**What flask-smorest does automatically:**
- Validates request body against the schema — returns 422 with field-level error messages on failure
- Validates query parameters against the schema
- Serializes the return value with the response schema
- Generates OpenAPI 3.x spec from all decorators
- Exposes `/docs` (Swagger UI) and `/redoc` endpoints

### 4.5 Spec JSON endpoint

The spec itself is available at `GET /openapi.json`. You can use this for:
- Client SDK generation (openapi-generator, hey-api)
- Postman collection import
- Contract testing between frontend and backend

---

## 5. Pitfalls Summary

### Testing pitfalls

**Pitfall 1 — Using `mongo` shell in MongoDB healthcheck for v6+**
The `mongo` CLI was removed in MongoDB 6.0. The healthcheck `test: ["CMD", "mongo", ...]` will silently fail forever. Use `mongosh` instead.

**Pitfall 2 — mongomock aggregation pipeline gaps**
mongomock does not implement `$lookup`, `$facet`, `$graphLookup`, or `$merge`. Tests using these will pass in unit tests and fail in production. For queries using complex pipelines, write integration tests against a real MongoDB container.

**Pitfall 3 — Flask test client does not run Gunicorn middleware**
The `app.test_client()` runs WSGI directly, bypassing nginx proxy headers. If your code relies on `X-Forwarded-For` or similar, test those separately or use `environ_overrides` on the test client.

**Pitfall 4 — Stripe webhook signature verification fails with request.json**
Stripe's `Webhook.construct_event` requires the raw request bytes. Calling `request.json` first causes Flask to consume and decode the body, breaking signature verification. Always use `request.get_data()` in the webhook route.

**Pitfall 5 — `depends_on` without `condition: service_healthy`**
The default `depends_on` only waits for the container process to start, not for the service inside to be ready. Without the healthcheck condition, Flask will attempt to connect to MongoDB before `mongod` accepts connections, causing startup crashes.

### Deployment pitfalls

**Pitfall 6 — Using `flask run` in production**
Flask's development server is single-threaded, has no connection keep-alive, and prints debug tracebacks to HTTP responses. Always use Gunicorn with multiple workers in production. Set `workers = 2 * cpu_cores + 1` as a starting point.

**Pitfall 7 — Committing `.env` files**
Stripe secret keys, MongoDB passwords, and Flask SECRET_KEY must never be committed. Use `.env.example` with placeholder values in source control and load real values from environment variables in CI/CD and the deployment host.

**Pitfall 8 — VITE_* env var baked at build time**
Vite inlines `VITE_*` variables at `npm run build` time — they cannot be changed at container runtime. For the recommended pattern (nginx proxying `/api` to Flask on the internal network), `VITE_API_BASE_URL=/api` is correct and stable. Avoid pointing to `http://localhost:5000` — that works locally but breaks in Docker where `localhost` inside nginx points to the nginx container, not Flask.

**Pitfall 9 — MongoDB data volume not persisted in docker-compose.yml**
Omitting the named volume `mongo_data:/data/db` means all MongoDB data is lost when the container restarts. Always declare a named volume for the data directory.

**Pitfall 10 — Duplicate order fulfillment**
Stripe retries webhook delivery up to 35 times over 3 days if your endpoint returns a non-2xx response. Without an idempotency check (storing processed `session_id` values), every retry creates a new order. Always write the idempotency guard before any fulfillment logic.

---

## 6. Recommended Package Versions (as of early 2026)

### Backend (requirements.txt)

```
flask>=3.1
flask-smorest>=0.47
marshmallow>=3.23
pymongo>=4.10
mongomock>=4.1           # testing only
stripe>=11.0
gunicorn>=23.0
python-dotenv>=1.0

# testing
pytest>=8.3
pytest-flask>=1.3
pytest-cov>=6.0
factory-boy>=3.3
```

### Frontend (package.json devDependencies)

```json
{
  "vitest": "^2.1",
  "@testing-library/react": "^16.0",
  "@testing-library/user-event": "^14.5",
  "@testing-library/jest-dom": "^6.6",
  "@vitest/coverage-v8": "^2.1",
  "msw": "^2.6",
  "jsdom": "^25.0",
  "@playwright/test": "^1.49"
}
```

---

## Sources

- [Flask Testing — Official Documentation](https://flask.palletsprojects.com/en/stable/testing/)
- [TestDriven.io — Testing Flask Applications with Pytest](https://testdriven.io/blog/flask-pytest/)
- [pytest-flask — PyPI](https://pypi.org/project/pytest-flask/)
- [flask-smorest Quickstart](https://flask-smorest.readthedocs.io/en/latest/quickstart.html)
- [Flask OpenAPI with flask-smorest — Teclado Course](https://rest-apis-flask.teclado.com/docs/flask_smorest/validation_with_marshmallow/)
- [APIFlask Comparison with flasgger / flask-smorest](https://apiflask.com/comparison/)
- [Stripe: Fulfill Orders after Checkout](https://docs.stripe.com/checkout/fulfillment)
- [Stripe: Receive Webhook Events](https://docs.stripe.com/webhooks)
- [Stripe: Idempotent Requests](https://docs.stripe.com/api/idempotent_requests)
- [Miguel Grinberg — How to Dockerize a React + Flask Project](https://blog.miguelgrinberg.com/post/how-to-dockerize-a-react-flask-project)
- [Docker Compose: Control Startup Order](https://docs.docker.com/compose/how-tos/startup-order/)
- [Docker Compose Healthchecks Guide — Last9](https://last9.io/blog/docker-compose-health-checks/)
- [flasgger GitHub](https://github.com/flasgger/flasgger)
- [Playwright: Testing React Components](https://playwright.dev/docs/test-components)
- [React Testing Library — Vitest Setup Guide](https://dev.to/kevinccbsg/react-testing-setup-vitest-typescript-react-testing-library-42c8)
- [MSW — Mock Service Worker](https://mswjs.io/)
- [Stripe CLI — Test Webhooks Locally](https://stripe.com/docs/webhooks/test)
- [mongomock — PyPI](https://pypi.org/project/mongomock/)
- [Unit testing PyMongo Flask with mongomock — DEV Community](https://dev.to/reritom/unit-testing-pymongo-flask-applications-with-mongomock-and-patches-1m23)
- [Nginx configuration for React SPAs — OneUptime Blog](https://oneuptime.com/blog/post/2026-01-15-configure-nginx-production-react-spa/view)
- [LaunchDarkly — Best practices for testing Stripe webhooks](https://launchdarkly.com/blog/best-practices-for-testing-stripe-webhook-event-processing/)
