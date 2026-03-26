# Architecture Research: React 18 + Flask + MongoDB E-Grocery Rebuild

**Project:** SE_egrocery production rebuild
**Researched:** 2026-03-26
**Overall confidence:** HIGH (stack is settled; patterns are verified against current docs and official sources)

---

## Current Codebase Audit

Before recommendations: the existing code reveals specific problems to fix.

**`backend/api_be.py` (single file, 77 lines):**
- No blueprints, no application factory
- `filter_object = request.json` passed directly to `collection.find()` — NoSQL injection vector
- No authentication on any endpoint
- No input validation whatsoever
- `get_cart()` iterates over an always-empty `cart_products = []` — the endpoint is broken
- No error handling; MongoDB ObjectId serialization will crash on `.find()` results

**`frontend_react/src/App.js` (monolithic):**
- Cart state, add/remove logic, navigation state, search state all in one component
- Props drilled 3 levels deep (`cartProp`, `addItemToCart`, `removeItemFromCart`, `accountStatus`, etc.)
- No authentication token management
- No API error handling
- No code splitting

Everything below addresses these specific gaps.

---

## 1. React 18 Architecture

### 1.1 State Management

**Decision: Zustand for shared client state + TanStack Query for server state.**

Do not use Redux. The codebase needs exactly two categories of state:

| State Category | Tool | Examples |
|---|---|---|
| Server/remote state | TanStack Query v5 | products list, product detail, order history |
| Client shared state | Zustand | cart items, auth token, UI modal open/close |
| Local component state | `useState` / `useReducer` | form input values, dropdown open |

**Why not Context API for cart:** Every consumer re-renders when any value in a Context changes. With cart + auth + search in one Context, a quantity increment re-renders the Header, Body, and every child. Zustand selectively re-renders only components subscribed to the changed slice. [Source: React State Management in 2025](https://www.developerway.com/posts/react-state-management-2025)

**Zustand cart store pattern (direct implementation target):**

```javascript
// src/stores/cartStore.js
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],  // [{ productId, sku, title, price, quantity, imageUrl }]

      addItem: (product) => set((state) => {
        const existing = state.items.find(i => i.sku === product.sku)
        if (existing) {
          return {
            items: state.items.map(i =>
              i.sku === product.sku ? { ...i, quantity: i.quantity + 1 } : i
            )
          }
        }
        return { items: [...state.items, { ...product, quantity: 1 }] }
      }),

      removeItem: (sku) => set((state) => ({
        items: state.items
          .map(i => i.sku === sku ? { ...i, quantity: i.quantity - 1 } : i)
          .filter(i => i.quantity > 0)
      })),

      clearCart: () => set({ items: [] }),

      totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
      totalPrice: () => get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    }),
    { name: 'cart-storage' }  // persists to localStorage via zustand/middleware
  )
)

// src/stores/authStore.js
export const useAuthStore = create((set) => ({
  user: null,        // { id, email, role }
  accessToken: null, // short-lived, in memory only
  setAuth: (user, token) => set({ user, accessToken: token }),
  clearAuth: () => set({ user: null, accessToken: null }),
}))
```

**Key point:** `persist` middleware serializes cart to localStorage on every change. Access token is intentionally NOT persisted (memory only, see Section 4).

### 1.2 Folder Structure

**Decision: Feature-based with shared components layer.**

The current flat structure (`src/Components/`) will not scale. Use feature-based architecture. [Source: React Folder Structure 2025](https://www.robinwieruch.de/react-folder-structure/) [Source: bulletproof-react](https://github.com/alan2207/bulletproof-react/blob/master/docs/project-structure.md)

```
src/
  app/                    # App shell: routing, providers, global config
    App.jsx
    Router.jsx
    QueryProvider.jsx
  assets/                 # Images, icons, fonts
  components/             # Truly shared, domain-agnostic UI
    Button/
    Modal/
    ErrorFallback/
  features/               # One folder per domain feature
    products/
      api/                # TanStack Query hooks for this feature
        useProducts.js
        useProduct.js
      components/
        ProductCard.jsx
        ProductGrid.jsx
        ProductFilters.jsx
      index.js            # Public API of this feature (barrel export)
    cart/
      components/
        CartDrawer.jsx
        CartItem.jsx
        CartSummary.jsx
      index.js
    auth/
      api/
        useLogin.js
        useRegister.js
      components/
        LoginForm.jsx
      index.js
    orders/
      api/
        useOrders.js
        useCheckout.js
      components/
        OrderList.jsx
        OrderDetail.jsx
  hooks/                  # Shared hooks (useDebounce, useLocalStorage)
  stores/                 # Zustand stores
    cartStore.js
    authStore.js
  lib/                    # Third-party wrappers, API client config
    apiClient.js          # Axios instance with auth interceptors
  types/                  # Shared TypeScript types (if/when migrated)
  utils/                  # Pure utility functions
```

**Rule:** Features only import from `components/`, `hooks/`, `stores/`, `lib/`, `utils/`. Features never import from other features directly. If two features need to share something, it moves to `components/` or `hooks/`.

### 1.3 Data Fetching with TanStack Query

**Decision: TanStack Query v5 (`@tanstack/react-query`).**

Replaces all `useEffect(() => { fetch(...) }, [])` patterns in the existing code. Provides caching, deduplication, background refresh, and loading/error states automatically. [Source: TanStack Query Suspense Docs](https://tanstack.com/query/v4/docs/framework/react/guides/suspense)

```javascript
// src/features/products/api/useProducts.js
import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/lib/apiClient'

export const useProducts = (filters = {}) => {
  return useQuery({
    queryKey: ['products', filters],  // cache key — changes when filters change
    queryFn: () => apiClient.get('/products', { params: filters }).then(r => r.data),
    staleTime: 5 * 60 * 1000,  // data is fresh for 5 minutes
  })
}

// Usage in component:
const { data: products, isLoading, error } = useProducts({ category: 'dairy' })
```

**Mutation pattern for checkout:**
```javascript
const checkoutMutation = useMutation({
  mutationFn: (orderData) => apiClient.post('/orders', orderData),
  onSuccess: () => {
    useCartStore.getState().clearCart()
    queryClient.invalidateQueries({ queryKey: ['orders'] })
  },
  onError: (error) => {
    // error.response.data.message from Flask API envelope
  }
})
```

### 1.4 Error Boundaries

**Decision: `react-error-boundary` package (v6.1.1, current as of 2026-03-26).**

React still requires class components for error boundaries. `react-error-boundary` provides a functional-friendly wrapper. [Source: react-error-boundary GitHub](https://github.com/bvaughn/react-error-boundary)

```javascript
// src/components/ErrorFallback/ErrorFallback.jsx
export const ErrorFallback = ({ error, resetErrorBoundary }) => (
  <div role="alert" className="error-fallback">
    <h2>Something went wrong</h2>
    <pre>{error.message}</pre>
    <button onClick={resetErrorBoundary}>Try again</button>
  </div>
)

// src/app/App.jsx — wrap feature sections independently
import { ErrorBoundary } from 'react-error-boundary'

function App() {
  return (
    <div className="App">
      <Header />
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <main>
          <Router />
        </main>
      </ErrorBoundary>
      <Footer />
    </div>
  )
}
```

**Scope boundaries correctly:** Wrap at feature/route level, not at the top of the entire tree. If the cart crashes, the rest of the app should still work.

Pair with TanStack Query's `QueryErrorResetBoundary` to enable retry after API failures:

```javascript
import { QueryErrorResetBoundary } from '@tanstack/react-query'
import { ErrorBoundary } from 'react-error-boundary'

<QueryErrorResetBoundary>
  {({ reset }) => (
    <ErrorBoundary onReset={reset} FallbackComponent={ErrorFallback}>
      <ProductGrid />
    </ErrorBoundary>
  )}
</QueryErrorResetBoundary>
```

### 1.5 API Client

Centralise all HTTP calls in one Axios instance. Auth headers and token refresh logic live here, not scattered across components.

```javascript
// src/lib/apiClient.js
import axios from 'axios'
import { useAuthStore } from '@/stores/authStore'

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
  withCredentials: true,  // send httpOnly refresh cookie
})

// Attach access token to every request
apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// On 401, attempt silent token refresh
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true
      try {
        const { data } = await axios.post(
          `${apiClient.defaults.baseURL}/auth/refresh`,
          {},
          { withCredentials: true }
        )
        useAuthStore.getState().setAuth(data.user, data.access_token)
        original.headers.Authorization = `Bearer ${data.access_token}`
        return apiClient(original)
      } catch {
        useAuthStore.getState().clearAuth()
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)
```

---

## 2. Flask API Architecture

### 2.1 Application Factory with Blueprints

**Decision: Application factory pattern. One blueprint per domain.**

The current single-file `api_be.py` cannot be tested, cannot be configured per environment, and cannot scale. [Source: Flask Large App Best Practices 2025](https://dev.to/gajanan0707/how-to-structure-a-large-flask-application-best-practices-for-2025-9j2) [Source: Flask App Factory Pattern](https://oneuptime.com/blog/post/2026-02-02-flask-app-factory-pattern/view)

**Target directory structure:**

```
backend/
  app/
    __init__.py         # create_app() factory
    config.py           # Config classes (Dev, Prod, Test)
    db.py               # PyMongo init, exported as `mongo`
    extensions.py       # JWT, CORS, other extension init
    routes/
      products.py       # Blueprint: /api/products
      categories.py     # Blueprint: /api/categories
      cart.py           # Blueprint: /api/cart
      orders.py         # Blueprint: /api/orders
      auth.py           # Blueprint: /api/auth
    schemas/            # Marshmallow schemas for validation
      product.py
      order.py
      user.py
    services/           # Business logic, no Flask request context
      cart_service.py
      order_service.py
      inventory_service.py
    errors.py           # Global error handlers
  run.py
  requirements.txt
  .env
```

**`app/__init__.py`:**

```python
from flask import Flask
from flask_cors import CORS
from .db import mongo
from .extensions import jwt
from .errors import register_error_handlers

def create_app(config_name='development'):
    app = Flask(__name__)
    app.config.from_object(config_map[config_name])

    # Extensions
    mongo.init_app(app)
    jwt.init_app(app)
    CORS(app, origins=app.config['CORS_ORIGINS'], supports_credentials=True)

    # Blueprints
    from .routes.products import products_bp
    from .routes.categories import categories_bp
    from .routes.cart import cart_bp
    from .routes.orders import orders_bp
    from .routes.auth import auth_bp
    app.register_blueprint(products_bp, url_prefix='/api')
    app.register_blueprint(categories_bp, url_prefix='/api')
    app.register_blueprint(cart_bp, url_prefix='/api')
    app.register_blueprint(orders_bp, url_prefix='/api')
    app.register_blueprint(auth_bp, url_prefix='/api')

    register_error_handlers(app)
    return app
```

### 2.2 Input Validation with flask-smorest + Marshmallow

**Decision: flask-smorest for all routes.** It provides marshmallow-based validation, automatic OpenAPI 3 docs, and Swagger UI at `/docs` — no extra work. [Source: flask-smorest docs](https://flask-smorest.readthedocs.io/en/latest/quickstart.html) [Source: flask-smorest PyPI](https://pypi.org/project/flask-smorest/)

```python
# app/schemas/product.py
from marshmallow import Schema, fields, validate

class ProductQuerySchema(Schema):
    category = fields.Str(load_default=None)
    min_price = fields.Float(load_default=0.0, validate=validate.Range(min=0))
    max_price = fields.Float(load_default=None)
    search = fields.Str(load_default=None)
    page = fields.Int(load_default=1, validate=validate.Range(min=1))
    per_page = fields.Int(load_default=20, validate=validate.Range(min=1, max=100))

class ProductSchema(Schema):
    id = fields.Str(attribute='_id', dump_only=True)
    title = fields.Str(required=True)
    price = fields.Int(required=True)  # store as cents
    category_id = fields.Str(required=True)
    sku = fields.Str(required=True)
    stock = fields.Int(dump_only=True)

# app/routes/products.py
from flask_smorest import Blueprint
from ..schemas.product import ProductQuerySchema, ProductSchema
from ..services.product_service import get_products

blp = Blueprint('products', __name__, description='Product catalog')

@blp.route('/products')
class ProductList(MethodView):
    @blp.arguments(ProductQuerySchema, location='query')
    @blp.response(200, ProductSchema(many=True))
    def get(self, query_args):
        return get_products(query_args)
```

**Critical:** `@blp.arguments` validates and deserializes before your handler runs. Invalid input returns a structured 422 response automatically. Never pass raw `request.json` to a MongoDB query.

### 2.3 Global Error Handling

**Decision: Register handlers for `HTTPException`, `ValidationError`, and generic `Exception` at the app level.** All errors return the same JSON envelope. [Source: Flask Error Handling Docs](https://flask.palletsprojects.com/en/stable/errorhandling/)

```python
# app/errors.py
from flask import jsonify
from werkzeug.exceptions import HTTPException

def register_error_handlers(app):

    @app.errorhandler(HTTPException)
    def handle_http_exception(e):
        return jsonify({
            'error': e.name,
            'message': e.description,
            'status_code': e.code,
        }), e.code

    @app.errorhandler(422)  # marshmallow validation error from flask-smorest
    def handle_validation_error(e):
        return jsonify({
            'error': 'Validation Error',
            'message': 'Request data failed validation',
            'details': e.exc.messages if hasattr(e, 'exc') else str(e),
            'status_code': 422,
        }), 422

    @app.errorhandler(Exception)
    def handle_generic_exception(e):
        # Log the full traceback here (use app.logger.exception)
        app.logger.exception('Unhandled exception: %s', str(e))
        return jsonify({
            'error': 'Internal Server Error',
            'message': 'An unexpected error occurred',
            'status_code': 500,
        }), 500
```

**Consistent response envelope:** Every error response has `error`, `message`, `status_code`. Frontend code checks `error.response.data.message` in one place.

### 2.4 MongoDB ObjectId Serialization

The existing code will crash trying to JSON-serialize ObjectId. Fix with a custom encoder registered on the Flask app:

```python
# app/__init__.py or app/db.py
from bson import ObjectId
from flask.json.provider import DefaultJSONProvider

class MongoJSONProvider(DefaultJSONProvider):
    def default(self, obj):
        if isinstance(obj, ObjectId):
            return str(obj)
        return super().default(obj)

# In create_app():
app.json_provider_class = MongoJSONProvider
app.json = MongoJSONProvider(app)
```

---

## 3. MongoDB Schema Design

### 3.1 Core Design Principles

**Embed when:** data is always read together, relationship is one-to-few, subdocuments don't grow unboundedly.
**Reference when:** data is shared across documents (categories), documents would grow unboundedly (order history on user), or subdocuments update independently.

**Price convention:** Store prices as integers (cents). `1099` = $10.99. Avoids floating-point rounding errors in totals.

[Source: MongoDB Schema Design Best Practices](https://www.mongodb.com/developer/products/mongodb/mongodb-schema-design-best-practices/) [Source: MongoDB E-commerce Blog](https://www.mongodb.com/blog/post/retail-reference-architecture-part-1-building-flexible-searchable-low-latency-product)

### 3.2 Collections

**`products` collection:**

```javascript
{
  _id: ObjectId,
  slug: "organic-whole-milk-1l",   // URL-safe, unique index
  sku: "MILK-ORG-1L",              // unique index
  title: "Organic Whole Milk 1L",
  brand: "Happy Cow",
  price: 349,                       // cents — $3.49
  currency: "USD",
  category_id: ObjectId,            // reference to categories
  // Extended reference: copy category name to avoid joins on listing page
  category_name: "Dairy",
  description: "...",
  images: ["url1", "url2"],         // bounded array, fine to embed
  attrs: { weight: "1kg", organic: true },
  rating: { avg: 4.3, count: 127 }, // denormalized summary, updated on review
  stock: 48,                        // decrement atomically at checkout
  active: true,
  created_at: ISODate,
  updated_at: ISODate,
}
// Indexes:
// { sku: 1 }              unique
// { slug: 1 }             unique
// { category_id: 1, active: 1, price: 1 }  compound for filtered listing
// { title: "text", brand: "text" }          text search
```

**`users` collection:**

```javascript
{
  _id: ObjectId,
  email: "user@example.com",       // unique index
  password_hash: "bcrypt...",      // never return this field in API responses
  role: "customer",                // "customer" | "admin"
  addresses: [                     // embed: bounded, always read with user
    {
      label: "Home",
      line1: "123 Main St",
      city: "Anytown",
      state: "CA",
      zip: "90210",
      country: "US",
      is_default: true,
    }
  ],
  created_at: ISODate,
  last_login: ISODate,
}
// Indexes:
// { email: 1 }  unique
```

**`carts` collection:**

```javascript
{
  _id: ObjectId,
  user_id: ObjectId,               // null for guest carts (use session_id instead)
  session_id: "uuid-v4",           // for guest carts
  items: [
    {
      product_id: ObjectId,
      sku: "MILK-ORG-1L",          // copy at add-to-cart time
      title: "Organic Whole Milk 1L",  // copy: protects against price/name changes mid-session
      price: 349,                  // copy at add-to-cart time — CRITICAL
      image_url: "...",
      quantity: 2,
    }
  ],
  updated_at: ISODate,             // TTL index on this field
}
// Indexes:
// { user_id: 1 }
// { session_id: 1 }
// { updated_at: 1 }  TTL: expireAfterSeconds: 604800  (7 days)
```

**TTL cart cleanup in PyMongo:**
```python
# Run once during app bootstrap / migration
db.carts.create_index("updated_at", expireAfterSeconds=604800)
```

[Source: MongoDB TTL Indexes](https://www.mongodb.com/docs/manual/core/index-ttl/)

**`orders` collection:**

Orders are immutable snapshots. Never reference products for order line items — denormalize everything at order creation time.

```javascript
{
  _id: ObjectId,
  order_no: "ORD-20260326-0001",   // human-readable, unique index
  user_id: ObjectId,
  status: "pending",               // pending | confirmed | shipped | delivered | cancelled
  items: [                         // full snapshot at order time
    {
      product_id: ObjectId,        // kept for reference, never read for display
      sku: "MILK-ORG-1L",
      title: "Organic Whole Milk 1L",
      price: 349,                  // price AT TIME OF ORDER
      quantity: 2,
      line_total: 698,
    }
  ],
  shipping_address: {              // embed: snapshot of address at order time
    line1: "123 Main St",
    city: "Anytown",
    state: "CA",
    zip: "90210",
    country: "US",
  },
  totals: {
    subtotal: 698,
    tax: 63,
    shipping: 299,
    grand_total: 1060,
  },
  payment: {
    method: "stripe",
    status: "paid",
    reference: "pi_xxx",
  },
  placed_at: ISODate,
  updated_at: ISODate,
}
// Indexes:
// { order_no: 1 }        unique
// { user_id: 1, placed_at: -1 }  compound for order history
// { status: 1 }          for admin filtering
```

### 3.3 Inventory Update Pattern (Atomic Checkout)

Use `$inc` with a condition to prevent overselling. Never do read-then-write in two separate operations:

```python
# services/inventory_service.py
def decrement_stock(db, items):
    """Atomically decrement stock for all items. Raises if any item is out of stock."""
    for item in items:
        result = db.products.update_one(
            {
                '_id': item['product_id'],
                'stock': {'$gte': item['quantity']}  # condition: must have enough
            },
            {'$inc': {'stock': -item['quantity']}}
        )
        if result.modified_count == 0:
            raise InsufficientStockError(item['sku'])
```

---

## 4. JWT Authentication Pattern

### 4.1 Token Storage Strategy

**Decision: Access token in memory (Zustand store) + Refresh token in httpOnly cookie.**

| Token | Storage | Why |
|---|---|---|
| Access token (15min TTL) | Zustand store (JS memory) | Short-lived, lost on page refresh (acceptable). Not accessible to XSS. |
| Refresh token (7 days TTL) | httpOnly cookie | Browser sends automatically. JS cannot read it. CSRF mitigated by SameSite=Lax. |

**Why not localStorage for access token:** localStorage survives page refresh but is accessible to any JavaScript on the page. An XSS attack that injects a script into the grocery app could steal it. The 15-minute TTL makes the memory approach acceptable. [Source: Stop Using LocalStorage for JWTs 2025](https://medium.com/lets-code-future/stop-using-localstorage-for-jwts-in-your-spa-heres-the-safer-smarter-alternative-in-2025-ece409045978) [Source: JWT Storage Guide](https://cybersierra.co/blog/react-jwt-storage-guide/)

### 4.2 Flask-JWT-Extended Configuration

```python
# app/config.py
class Config:
    JWT_SECRET_KEY = os.environ['JWT_SECRET_KEY']
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(minutes=15)
    JWT_REFRESH_TOKEN_EXPIRES = timedelta(days=7)

    # Cookie config for refresh token
    JWT_TOKEN_LOCATION = ['headers', 'cookies']
    JWT_COOKIE_SECURE = True          # HTTPS only in production; set False for local dev
    JWT_COOKIE_SAMESITE = 'Lax'       # CSRF protection without blocking normal navigation
    JWT_COOKIE_CSRF_PROTECT = True    # Double-submit CSRF pattern (header + cookie)
    JWT_REFRESH_COOKIE_PATH = '/api/auth/refresh'  # Limit cookie scope
```

```python
# app/routes/auth.py
from flask_jwt_extended import (
    create_access_token, create_refresh_token,
    jwt_required, get_jwt_identity, set_refresh_cookies, unset_jwt_cookies
)

blp = Blueprint('auth', __name__)

@blp.route('/auth/login', methods=['POST'])
@blp.arguments(LoginSchema)
def login(data):
    user = verify_user(data['email'], data['password'])  # bcrypt check
    if not user:
        abort(401, message='Invalid credentials')

    access_token = create_access_token(identity=str(user['_id']))
    refresh_token = create_refresh_token(identity=str(user['_id']))

    response = jsonify({
        'access_token': access_token,
        'user': {'id': str(user['_id']), 'email': user['email'], 'role': user['role']}
    })
    set_refresh_cookies(response, refresh_token)  # sets httpOnly cookie
    return response, 200

@blp.route('/auth/refresh', methods=['POST'])
@jwt_required(refresh=True)  # reads from cookie automatically
def refresh():
    user_id = get_jwt_identity()
    new_access_token = create_access_token(identity=user_id)
    return jsonify({'access_token': new_access_token}), 200

@blp.route('/auth/logout', methods=['POST'])
def logout():
    response = jsonify({'message': 'Logged out'})
    unset_jwt_cookies(response)  # clears refresh cookie
    return response, 200
```

[Source: Flask-JWT-Extended PyPI](https://pypi.org/project/Flask-JWT-Extended/) [Source: JWT in Cookies flask-jwt-extended](https://flask-jwt-extended.readthedocs.io/en/3.0.0_release/tokens_in_cookies/)

### 4.3 React Token Lifecycle

On page load, React has no access token (it was in memory). The app must silently refresh before rendering protected content:

```javascript
// src/app/App.jsx
import { useEffect } from 'react'
import { useAuthStore } from '@/stores/authStore'
import { apiClient } from '@/lib/apiClient'

function App() {
  const setAuth = useAuthStore(s => s.setAuth)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    // Attempt silent refresh on mount
    apiClient.post('/api/auth/refresh')
      .then(({ data }) => setAuth(data.user, data.access_token))
      .catch(() => { /* no valid refresh token, stay logged out */ })
      .finally(() => setReady(true))
  }, [])

  if (!ready) return <AppLoadingSpinner />
  return <Router />
}
```

The Axios interceptor (Section 1.5) handles subsequent 401s during the session by attempting the same refresh call automatically.

### 4.4 Protected Routes in React

```javascript
// src/app/Router.jsx
import { useAuthStore } from '@/stores/authStore'

const ProtectedRoute = ({ children }) => {
  const user = useAuthStore(s => s.user)
  return user ? children : <Navigate to="/login" replace />
}

// Usage:
<Route path="/orders" element={
  <ProtectedRoute>
    <OrdersPage />
  </ProtectedRoute>
} />
```

---

## 5. Cross-Cutting Concerns

### 5.1 CORS Configuration

```python
# In create_app()
CORS(
    app,
    origins=['http://localhost:3000', 'https://yourdomain.com'],
    supports_credentials=True,  # REQUIRED for cookies
    methods=['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allow_headers=['Content-Type', 'Authorization', 'X-CSRF-TOKEN'],
)
```

`supports_credentials=True` is required for the browser to send the httpOnly refresh cookie with CORS requests.

### 5.2 Environment Configuration

```python
# app/config.py
import os

class DevelopmentConfig:
    DEBUG = True
    MONGO_URI = os.environ.get('MONGO_URI', 'mongodb://localhost:27017/egrocery_dev')
    JWT_COOKIE_SECURE = False   # allow HTTP in local dev
    CORS_ORIGINS = ['http://localhost:3000']

class ProductionConfig:
    DEBUG = False
    MONGO_URI = os.environ['MONGO_URI']
    JWT_COOKIE_SECURE = True
    CORS_ORIGINS = [os.environ['FRONTEND_URL']]

config_map = {
    'development': DevelopmentConfig,
    'production': ProductionConfig,
    'testing': TestingConfig,
}
```

### 5.3 MongoDB Indexing Summary

Run these during first-time setup / migrations:

```python
def create_indexes(db):
    # Products
    db.products.create_index([('sku', 1)], unique=True)
    db.products.create_index([('slug', 1)], unique=True)
    db.products.create_index([('category_id', 1), ('active', 1), ('price', 1)])
    db.products.create_index([('title', 'text'), ('brand', 'text')])

    # Users
    db.users.create_index([('email', 1)], unique=True)

    # Orders
    db.orders.create_index([('order_no', 1)], unique=True)
    db.orders.create_index([('user_id', 1), ('placed_at', -1)])

    # Carts — TTL cleanup after 7 days inactivity
    db.carts.create_index([('updated_at', 1)], expireAfterSeconds=604800)
    db.carts.create_index([('user_id', 1)])
    db.carts.create_index([('session_id', 1)])
```

---

## 6. Recommended Phase Order for the Rebuild

Based on dependencies between the patterns above:

1. **Backend foundation** — Application factory, config, DB init, global error handlers, ObjectId serialization. Everything else depends on this.

2. **Authentication** — JWT setup (Flask-JWT-Extended), login/register/refresh/logout endpoints, CORS with credentials. Frontend is blocked on auth.

3. **Product catalog API** — Products and categories endpoints with marshmallow validation. No auth required — this unblocks frontend development.

4. **Frontend foundation** — Zustand stores, Axios client with interceptors, TanStack Query provider, error boundaries, feature folder structure. Replaces the monolithic App.js.

5. **Cart feature** — Frontend Zustand cart store + backend cart endpoints (with auth). Depends on auth + product API.

6. **Orders/Checkout** — Order creation with atomic inventory decrement. Highest complexity, depends on cart + auth.

7. **Search and filters** — MongoDB text index queries, query parameter validation. Can be added to existing product endpoints.

---

## 7. Confidence Assessment

| Area | Confidence | Basis |
|---|---|---|
| React state management | HIGH | Official docs + multiple current sources verified 2025-2026 |
| Flask blueprint pattern | HIGH | Official Flask docs + current community guides |
| flask-smorest validation | HIGH | Official PyPI + readthedocs verified current |
| MongoDB schema patterns | HIGH | Official MongoDB docs + current blog posts |
| JWT httpOnly cookie pattern | HIGH | Multiple security sources agree; flask-jwt-extended official docs |
| react-error-boundary API | HIGH | GitHub README verified, version 6.1.1 current as of 2026-03-26 |
| TanStack Query v5 | MEDIUM | Official docs checked; v5 API differs from v4, verify on install |

---

## 8. Key Pitfalls to Avoid

| Pitfall | Why It Happens | Prevention |
|---|---|---|
| Passing raw `request.json` to MongoDB | As in current `api_be.py` | Always use marshmallow schema validation before any DB query |
| Storing access token in localStorage | Convenience | Access token in Zustand memory; refresh token in httpOnly cookie only |
| Single monolithic Flask file | Prototype habit | Application factory + blueprints from day one |
| Prop-drilling state from App.js | Starting simple | Zustand store — no providers needed, no prop chains |
| Missing ObjectId serialization | Python `ObjectId` is not JSON | Register `MongoJSONProvider` on app creation |
| No error boundaries | Works in development | Wrap each route/feature section independently |
| Forgetting `supports_credentials: True` on CORS | Cookies silently blocked | Required on both Flask CORS config and Axios `withCredentials: true` |
| Storing price as float | Floating point precision errors | Always store prices as integer cents |
| Order items referencing products (not embedding) | "Normal form" habit | Orders are snapshots; embed all line item data at order creation |
| Unbounded cart TTL | Abandoned carts fill DB | TTL index on `carts.updated_at` |

---

## Sources

- [React State Management in 2025: What You Actually Need](https://www.developerway.com/posts/react-state-management-2025)
- [React Folder Structure in 5 Steps 2025 - Robin Wieruch](https://www.robinwieruch.de/react-folder-structure/)
- [bulletproof-react project structure](https://github.com/alan2207/bulletproof-react/blob/master/docs/project-structure.md)
- [Do You Need State Management in 2025? - DEV Community](https://dev.to/themachinepulse/do-you-need-state-management-in-2025-react-context-vs-zustand-vs-jotai-vs-redux-1ho)
- [TanStack Query Suspense Docs](https://tanstack.com/query/v4/docs/framework/react/guides/suspense)
- [QueryErrorResetBoundary - TanStack Query](https://tanstack.com/query/v4/docs/framework/react/reference/QueryErrorResetBoundary)
- [react-error-boundary GitHub (v6.1.1)](https://github.com/bvaughn/react-error-boundary)
- [Flask Large App Structure Best Practices 2025 - DEV Community](https://dev.to/gajanan0707/how-to-structure-a-large-flask-application-best-practices-for-2025-9j2)
- [Flask App Factory Pattern - OneUptime](https://oneuptime.com/blog/post/2026-02-02-flask-app-factory-pattern/view)
- [flask-smorest quickstart documentation](https://flask-smorest.readthedocs.io/en/latest/quickstart.html)
- [flask-smorest PyPI](https://pypi.org/project/flask-smorest/)
- [Flask Error Handling - Official Docs](https://flask.palletsprojects.com/en/stable/errorhandling/)
- [MongoDB Schema Design Best Practices - Official Blog](https://www.mongodb.com/developer/products/mongodb/mongodb-schema-design-best-practices/)
- [MongoDB Retail Reference Architecture Part 1](https://www.mongodb.com/blog/post/retail-reference-architecture-part-1-building-flexible-searchable-low-latency-product)
- [MongoDB TTL Indexes - Official Docs](https://www.mongodb.com/docs/manual/core/index-ttl/)
- [Best MongoDB Schema for Online Stores (MERN) - Medium](https://medium.com/@mukesh.ram/best-mongodb-schema-for-online-stores-on-mern-practical-guide-7d6a84f23a87)
- [Flask-JWT-Extended PyPI](https://pypi.org/project/Flask-JWT-Extended/)
- [JWT in Cookies - flask-jwt-extended docs](https://flask-jwt-extended.readthedocs.io/en/3.0.0_release/tokens_in_cookies/)
- [Stop Using LocalStorage for JWTs in 2025](https://medium.com/lets-code-future/stop-using-localstorage-for-jwts-in-your-spa-heres-the-safer-smarter-alternative-in-2025-ece409045978)
- [JWT Storage Guide - CyberSierra](https://cybersierra.co/blog/react-jwt-storage-guide/)
- [Building Production-Ready E-Commerce with React - DEV Community](https://dev.to/robsonmuniz16/building-a-production-ready-e-commerce-platform-with-react-a-complete-walkthrough-5d3b)
