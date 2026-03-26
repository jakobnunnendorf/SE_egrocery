# Security & Code Quality Research: SE_egrocery

**Domain:** React + Flask + MongoDB e-commerce application
**Researched:** 2026-03-26
**Overall confidence:** HIGH (verified via official docs and multiple sources)
**Scope:** Portfolio-grade security - production habits, not enterprise hardening

---

## 1. Current Codebase Vulnerabilities (from audit of api_be.py)

Before recommendations, here is what is concretely broken in the existing code:

| Issue | Location | Severity |
|-------|----------|----------|
| Hardcoded connection string `mongodb://localhost:27017/` | `api_be.py:7` | Critical |
| `debug=True` in production | `api_be.py:77` | Critical |
| Raw `request.json` passed directly to `collection.find()` | `api_be.py:16,22` | Critical - NoSQL injection |
| No authentication on any endpoint | All routes | High |
| No CORS configuration | Missing | High |
| No input validation or schema enforcement | All routes | High |
| No error handling - MongoDB errors leak to client | All routes | High |
| No rate limiting | Missing | Medium |
| No security headers | Missing | Medium |

---

## 2. Flask API Security

### 2.1 CORS (Flask-CORS)

**Library:** `flask-cors` (maintained by corydolphin, current on PyPI)
**Install:** `pip install flask-cors`

**Rule:** Never use `origins="*"` with `supports_credentials=True`. The browser will reject it. Always name the React dev origin explicitly.

```python
from flask_cors import CORS

CORS(
    app,
    origins=["http://localhost:3000"],      # React dev server
    supports_credentials=True,             # needed for httpOnly cookie auth
    methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["Content-Type", "Authorization"],
)
```

For production, `origins` reads from an environment variable:
```python
import os
CORS(app, origins=os.environ.get("ALLOWED_ORIGINS", "").split(","))
```

**Confidence:** HIGH - official Flask-CORS docs confirm this pattern.

---

### 2.2 Rate Limiting (Flask-Limiter)

**Library:** `Flask-Limiter` - current stable version 4.1.1 per PyPI
**Install:** `pip install Flask-Limiter`

For a portfolio project, the in-memory store is fine in development. Use Redis in production.

```python
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address

limiter = Limiter(
    app=app,
    key_func=get_remote_address,
    default_limits=["200 per day", "50 per hour"],
    storage_uri="memory://",          # swap to "redis://localhost:6379" for prod
)

# Tighter limits on sensitive endpoints
@app.route('/auth/login', methods=['POST'])
@limiter.limit("10 per minute")
def login():
    ...

@app.route('/purchase', methods=['POST'])
@limiter.limit("20 per hour")
def purchase():
    ...
```

**Confidence:** HIGH - from Flask-Limiter official docs (flask-limiter.readthedocs.io).

---

### 2.3 Input Validation (marshmallow)

**Library:** `marshmallow` - current stable 4.2.2 per official docs
**Install:** `pip install marshmallow`

This is the single most important fix for the current codebase. The raw `filter_object = request.json`
passed to `collection.find()` is a direct NoSQL injection vector.

```python
from marshmallow import Schema, fields, validate, ValidationError

class ProductFilterSchema(Schema):
    category = fields.Str(load_default=None, validate=validate.Length(max=100))
    min_price = fields.Float(load_default=None, validate=validate.Range(min=0))
    max_price = fields.Float(load_default=None, validate=validate.Range(min=0))
    search = fields.Str(load_default=None, validate=validate.Length(max=200))

product_filter_schema = ProductFilterSchema()

@app.route('/products', methods=['GET'])
def get_products():
    try:
        # Validate - raises ValidationError if bad data
        validated = product_filter_schema.load(request.args)
    except ValidationError as err:
        return jsonify({"errors": err.messages}), 400

    # Build query only from validated fields - never pass raw input to find()
    query = {}
    if validated.get("category"):
        query["category"] = validated["category"]
    # ...
    products = list(collection.find(query))
    return jsonify(products)
```

CRITICAL RULE: Never pass `request.json` or `request.args` directly to any PyMongo method.

**Confidence:** HIGH - marshmallow official docs and MongoDB community forums confirm this pattern.

---

### 2.4 CSRF Protection

For a pure JSON API consumed by a React SPA, CSRF via `Flask-WTF` form tokens does not apply.
CSRF protection at the API layer is handled by:

1. Setting `SameSite=Lax` on all cookies (prevents cross-site form submissions)
2. Requiring `Content-Type: application/json` on mutating endpoints (browsers cannot send JSON
   cross-origin without a CORS preflight)
3. If using cookie-based JWT, Flask-JWT-Extended provides built-in double-submit cookie CSRF protection

This is simpler than traditional CSRF tokens and appropriate for SPA architecture.

---

### 2.5 Security Headers (Flask-Talisman)

**Library:** `flask-talisman` (Google Cloud Platform / wntrblm fork on PyPI)
**Install:** `pip install flask-talisman`

Flask-Talisman is the Flask equivalent of Helmet.js. It sets: HTTPS redirect, HSTS,
X-Frame-Options, X-Content-Type-Options, and Content Security Policy in one line.

```python
from flask_talisman import Talisman

# Development: force_https=False so local HTTP works
# Production: remove force_https override
Talisman(
    app,
    force_https=False,                     # set True in production
    content_security_policy={
        "default-src": "'self'",
        "img-src": ["'self'", "data:", "https:"],
        "script-src": "'self'",
        "style-src": ["'self'", "'unsafe-inline'"],  # MUI requires this
    },
    x_content_type_options=True,
    x_frame_options="SAMEORIGIN",
)
```

**Note on MUI:** Material UI injects inline styles, so `style-src 'unsafe-inline'` is required
unless you configure MUI's emotion cache with a nonce. For a portfolio project, 'unsafe-inline'
for styles is an acceptable tradeoff.

**Confidence:** HIGH - Flask-Talisman README (GitHub GoogleCloudPlatform/flask-talisman) confirmed.

---

### 2.6 Authentication (Flask-JWT-Extended with httpOnly Cookies)

**Library:** `Flask-JWT-Extended` - current stable 4.7.1
**Install:** `pip install Flask-JWT-Extended`

```python
from datetime import timedelta
from flask_jwt_extended import (
    JWTManager, create_access_token, jwt_required,
    set_access_cookies, unset_jwt_cookies
)

app.config["JWT_SECRET_KEY"] = os.environ["JWT_SECRET_KEY"]
app.config["JWT_TOKEN_LOCATION"] = ["cookies"]
app.config["JWT_COOKIE_SECURE"] = not app.debug     # True in production
app.config["JWT_COOKIE_CSRF_PROTECT"] = True         # double-submit CSRF
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)

jwt = JWTManager(app)

@app.route("/auth/login", methods=["POST"])
def login():
    # validate credentials...
    access_token = create_access_token(identity=user_id)
    response = jsonify({"logged_in": True})
    set_access_cookies(response, access_token)
    return response

@app.route("/purchase", methods=["POST"])
@jwt_required()
def purchase():
    ...
```

**Confidence:** HIGH - Flask-JWT-Extended official docs (flask-jwt-extended.readthedocs.io).

---

## 3. MongoDB Security

### 3.1 Connection String Management

**Rule:** The connection string contains credentials. It must never appear in source code.

```python
# WRONG (current code)
client = MongoClient('mongodb://localhost:27017/')

# CORRECT
import os
from dotenv import load_dotenv
load_dotenv()
client = MongoClient(os.environ["MONGODB_URI"])
```

`.env` file (never committed to git):
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/egrocery?retryWrites=true&w=majority
JWT_SECRET_KEY=your-random-32-char-string
```

`.gitignore` must include:
```
.env
*.env
```

**For MongoDB Atlas (recommended for portfolio):** Atlas provides free tier, built-in TLS, and
IP whitelisting. No local MongoDB needed.

**Confidence:** HIGH - MongoDB Atlas docs and python-dotenv pattern confirmed.

---

### 3.2 NoSQL Injection Prevention

MongoDB query operators like `$where`, `$gt`, `$ne` can be injected via user input if raw
request data reaches `collection.find()`.

**The attack pattern in the current code:**
```python
# VULNERABLE - attacker sends {"$gt": ""} as the filter
filter_object = request.json
filtered_products = collection.find(filter_object)
```

**Prevention rules:**

1. Never pass `request.json` directly to any PyMongo method
2. Use marshmallow schemas to whitelist allowed fields and types
3. Build queries explicitly from validated scalar values only
4. For user-supplied string fields like search, use regex with anchors:
   ```python
   import re
   query["name"] = {"$regex": re.escape(search_term), "$options": "i"}
   ```

5. For IDs, always use ObjectId conversion (raises InvalidId on malformed input):
   ```python
   from bson import ObjectId
   from bson.errors import InvalidId
   try:
       oid = ObjectId(request.args.get("id"))
   except InvalidId:
       return jsonify({"error": "Invalid ID"}), 400
   ```

**Confidence:** HIGH - CodeQL NoSQL injection docs and MongoDB community forums confirmed.

---

### 3.3 MongoDB User Roles (Atlas)

For MongoDB Atlas, create a dedicated database user for the application with minimum required permissions:

- Role: `readWrite` on the specific database only
- Do NOT use the Atlas admin credentials in application code
- Separate read-only user for analytics queries if needed

IP Access List: Whitelist only your server IP (or `0.0.0.0/0` during portfolio development, but document this).

**Confidence:** HIGH - MongoDB Atlas security docs confirmed.

---

### 3.4 Error Handling - Prevent Information Leakage

PyMongo raises exceptions that contain internal details. Never let them reach the client:

```python
from pymongo.errors import PyMongoError

@app.route('/products', methods=['GET'])
def get_products():
    try:
        products = list(collection.find(query))
        return jsonify(products)
    except PyMongoError as e:
        app.logger.error(f"Database error: {e}")          # log internally
        return jsonify({"error": "Service unavailable"}), 500  # generic to client
```

**Confidence:** HIGH - standard error handling pattern.

---

## 4. React Security

### 4.1 XSS Prevention

React escapes JSX expressions by default, making most XSS impossible in standard rendering.
The risk surfaces in two specific patterns:

**Pattern 1: HTML rendering from external data**

If any product descriptions, CMS content, or user-generated content is rendered as raw HTML,
use DOMPurify. Import it as `import DOMPurify from 'dompurify'` and sanitize with configured
allowed tags before rendering. For this e-grocery project, product descriptions are likely
plain text - avoid raw HTML rendering entirely. Use plain JSX rendering.

**Pattern 2: href from user data / external sources**

```jsx
// WRONG - javascript: URLs execute
<a href={product.url}>Link</a>

// CORRECT - validate protocol
function SafeLink({ url, children }) {
  const safe = url && (url.startsWith('https://') || url.startsWith('http://'));
  return safe ? <a href={url}>{children}</a> : <span>{children}</span>;
}
```

**Confidence:** HIGH - OWASP XSS Cheat Sheet and pragmaticwebsecurity.com confirmed.

---

### 4.2 Token Storage - httpOnly Cookies vs localStorage

**Recommendation: httpOnly cookies via the Flask backend.**

| Storage | XSS risk | CSRF risk | Persistence |
|---------|---------|-----------|-------------|
| `localStorage` | High - JS can read it | None | Survives refresh |
| `sessionStorage` | High - JS can read it | None | Lost on tab close |
| httpOnly cookie | None - JS cannot read | Mitigated by SameSite | Configurable |
| React state (memory) | None | None | Lost on refresh |

The Flask-JWT-Extended cookie setup described above is the recommended approach. The access token
is stored in an httpOnly cookie. React does not need to read it - the browser sends it automatically.

**For this project:** Use httpOnly cookies. This pairs with the Flask-JWT-Extended setup in section 2.6.

**Confidence:** HIGH - confirmed by DigitalOcean tutorial, Wisp CMS guide, and multiple 2026 sources.

---

### 4.3 Axios Security Configuration

The frontend uses Axios (confirmed in `package.json`). Configure it centrally:

```javascript
// src/api/client.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000',
  withCredentials: true,    // REQUIRED for httpOnly cookie auth to work
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Global error handler
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // redirect to login
    }
    return Promise.reject(error);
  }
);

export default apiClient;
```

`withCredentials: true` is required for cookies to be sent cross-origin. This pairs with
`supports_credentials=True` in Flask-CORS.

**Confidence:** HIGH - Axios official docs and Flask-CORS docs confirm this pairing requirement.

---

### 4.4 Environment Variables

React (Create React App) exposes any variable prefixed `REACT_APP_` to the browser bundle.
Do NOT put secrets here.

```
# .env (React root - do not put secret keys here)
REACT_APP_API_URL=http://localhost:5000
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_...  # publishable keys only
```

Stripe publishable keys are designed to be public. Secret keys (`sk_test_...`) must only
live in the Flask backend `.env`.

**Confidence:** HIGH - Create React App docs.

---

## 5. Code Quality Tooling

### 5.1 Python - Ruff (replaces Flake8 + Black + isort)

**Recommendation: Use Ruff.** It replaces Flake8, Black, isort, and pyupgrade in a single tool
written in Rust. It is 10-100x faster. FastAPI, pandas, and pydantic have all migrated to it.

**Install:**
```bash
pip install ruff
```

**`pyproject.toml` configuration:**
```toml
[tool.ruff]
line-length = 88
target-version = "py311"

[tool.ruff.lint]
select = [
    "E",   # pycodestyle errors
    "W",   # pycodestyle warnings
    "F",   # pyflakes
    "I",   # isort
    "S",   # bandit security rules
    "B",   # flake8-bugbear
    "UP",  # pyupgrade
]
ignore = ["S101"]  # allow assert in tests

[tool.ruff.format]
quote-style = "double"
indent-style = "space"
```

Run: `ruff check . && ruff format .`

**Confidence:** HIGH - Ruff official docs, multiple 2025 sources confirm it as the current standard.

---

### 5.2 Python - Security Scanning (Bandit + Safety)

**Bandit** - static analysis for security anti-patterns:
```bash
pip install bandit
bandit -r backend/ -ll   # -ll = medium and high severity only
```

Bandit will catch: hardcoded passwords, use of `md5`, `subprocess` with shell=True,
`debug=True` in production, etc.

**Safety** - dependency vulnerability scanning:
```bash
pip install safety
safety check
```

Safety checks your `requirements.txt` against a CVE database.

Both can be added to CI. For a portfolio project, run them manually before each release.

**Confidence:** HIGH - Bandit readthedocs.io and multiple security sources confirmed.

---

### 5.3 Python - Testing (pytest + pytest-cov)

```bash
pip install pytest pytest-cov
```

Run with coverage:
```bash
pytest --cov=backend --cov-report=term-missing
```

Minimum test structure for the Flask API:
```python
# tests/test_api.py
import pytest
from backend.api_be import app

@pytest.fixture
def client():
    app.config["TESTING"] = True
    with app.test_client() as client:
        yield client

def test_products_requires_valid_filter(client):
    response = client.get('/products', json={"$where": "1==1"})
    assert response.status_code == 400  # schema validation rejects it

def test_purchase_requires_auth(client):
    response = client.post('/purchase', json={"cart_items": []})
    assert response.status_code == 401
```

**Confidence:** HIGH - Flask testing docs and pytest-cov PyPI confirmed.

---

### 5.4 JavaScript/React - ESLint Configuration

The current `package.json` has a minimal ESLint config. Upgrade to a security-aware config:

**Install:**
```bash
npm install -D eslint-plugin-security eslint-plugin-react-hooks prettier eslint-config-prettier
```

**`.eslintrc.js`:**
```javascript
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'react-app',
    'react-app/jest',
    'plugin:security/recommended',
    'prettier',               // must be last - disables formatting rules
  ],
  plugins: ['security', 'react-hooks'],
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'no-eval': 'error',
    'no-implied-eval': 'error',
    'security/detect-object-injection': 'warn',
    'security/detect-non-literal-regexp': 'warn',
  },
};
```

Key rules `eslint-plugin-security` catches: `detect-object-injection`, `detect-eval-with-expression`,
`detect-non-literal-fs-filename`, `detect-possible-timing-attacks`.

**Note:** `eslint-plugin-react-security` (Snyk) is no longer actively maintained. Use
`eslint-plugin-security` (eslint-community) instead.

**Confidence:** HIGH - eslint-plugin-security npm page and GitHub eslint-community confirmed.

---

### 5.5 JavaScript/React - Prettier

```bash
npm install -D prettier
```

**`.prettierrc`:**
```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100
}
```

Run: `npx prettier --write "src/**/*.{js,jsx,css}"`

**Confidence:** HIGH - Prettier official docs.

---

### 5.6 Pre-commit Hooks (.pre-commit-config.yaml)

**Install:**
```bash
pip install pre-commit
pre-commit install
```

**`.pre-commit-config.yaml` (project root):**
```yaml
repos:
  # General file hygiene
  - repo: https://github.com/pre-commit/pre-commit-hooks
    rev: v4.5.0
    hooks:
      - id: trailing-whitespace
      - id: end-of-file-fixer
      - id: check-yaml
      - id: check-json
      - id: check-merge-conflict
      - id: detect-private-key         # catches accidentally committed secrets
      - id: no-commit-to-branch        # prevents direct commits to main
        args: ['--branch', 'main']

  # Python: Ruff (lint + format)
  - repo: https://github.com/astral-sh/ruff-pre-commit
    rev: v0.3.0
    hooks:
      - id: ruff
        args: [--fix]
      - id: ruff-format

  # Python: Bandit security scan
  - repo: https://github.com/PyCQA/bandit
    rev: 1.7.7
    hooks:
      - id: bandit
        args: ["-r", "backend/", "-ll"]

  # JavaScript: ESLint
  - repo: local
    hooks:
      - id: eslint
        name: eslint
        language: node
        entry: npx eslint --fix
        files: \.(js|jsx)$
        types: [file]

  # JavaScript: Prettier
  - repo: local
    hooks:
      - id: prettier
        name: prettier
        language: node
        entry: npx prettier --write
        files: \.(js|jsx|css|json)$
        types: [file]
```

Run all hooks manually: `pre-commit run --all-files`

**Confidence:** HIGH - pre-commit.com official docs confirmed.

---

## 6. Implementation Priority Order

For rebuilding from the current broken state, address in this order:

### Phase 1 - Stop the bleeding (critical security)
1. Move MongoDB connection string to `.env` + `python-dotenv`
2. Remove `debug=True` from production path (use env var)
3. Add marshmallow validation to ALL endpoints that accept user input
4. Add proper error handling (try/except PyMongoError)

### Phase 2 - Add structure
5. Configure Flask-CORS with explicit origins
6. Add Flask-JWT-Extended with httpOnly cookies
7. Protect all write endpoints with `@jwt_required()`
8. Create Axios client with `withCredentials: true`

### Phase 3 - Harden
9. Add Flask-Talisman security headers
10. Add Flask-Limiter rate limiting on auth and purchase endpoints
11. Configure ESLint with security plugin
12. Set up pre-commit hooks

### Phase 4 - Quality assurance
13. Add pytest test suite with auth and validation tests
14. Run Bandit and Safety scans
15. Add Ruff to pyproject.toml

---

## 7. Required Dependencies Summary

### Python (requirements.txt additions)
```
flask-cors>=4.0.0
flask-limiter>=4.1.1
flask-talisman>=1.1.0
flask-jwt-extended>=4.7.1
marshmallow>=3.21.0
python-dotenv>=1.0.0
pymongo[srv]>=4.7.0       # [srv] enables mongodb+srv:// Atlas connection strings
pytest>=8.0.0
pytest-cov>=5.0.0
bandit>=1.7.7
safety>=3.0.0
ruff>=0.3.0
```

### JavaScript (package.json additions)
```
dompurify                         # only if HTML rendering is needed
eslint-plugin-security            # security linting
eslint-plugin-react-hooks         # hooks rules
eslint-config-prettier            # prettier conflict resolution
prettier                          # formatting
```

---

## 8. What NOT to Build (for portfolio scope)

| Feature | Why Skip | What Instead |
|---------|---------|--------------|
| OAuth / SSO | Massive scope increase | Simple JWT username/password |
| Redis for rate limiting | Infrastructure complexity | Flask-Limiter in-memory store |
| Refresh token rotation | Complex token management | Short-lived access tokens (1hr) |
| Field-level MongoDB encryption | Enterprise only | TLS-in-transit via Atlas |
| OWASP ZAP automated scanning | CI/CD complexity | Manual Bandit + Safety |
| Content-Type: multipart hardening | No file uploads in scope | N/A |

---

## 9. Confidence Assessment

| Area | Confidence | Basis |
|------|------------|-------|
| Flask security libraries | HIGH | Official PyPI + readthedocs.io confirmed |
| MongoDB injection prevention | HIGH | CodeQL docs + MongoDB community forums |
| React XSS | HIGH | OWASP Cheat Sheet + pragmaticwebsecurity.com |
| JWT cookie storage | HIGH | Flask-JWT-Extended official docs |
| Ruff/pre-commit tooling | HIGH | Ruff official docs + 2025 community consensus |
| ESLint security plugins | MEDIUM | npm page confirmed; Snyk plugin deprecated |
| CSP with MUI inline styles | MEDIUM | Known MUI limitation; nonce approach not verified in this stack |

---

## Sources

### Flask Security
- [Flask Security Best Practices 2025 - Corgea](https://hub.corgea.com/articles/flask-security-best-practices-2025)
- [Best Practices to Protect Flask Applications - Escape.tech](https://escape.tech/blog/best-practices-protect-flask-applications/)
- [Flask-Limiter Documentation 4.1.1](https://flask-limiter.readthedocs.io/en/stable/)
- [Flask-Talisman - GoogleCloudPlatform GitHub](https://github.com/GoogleCloudPlatform/flask-talisman)
- [Flask-CORS Configuration Docs](https://flask-cors.readthedocs.io/en/latest/configuration.html)
- [Flask-JWT-Extended Cookies Documentation](https://flask-jwt-extended.readthedocs.io/en/stable/token_locations.html)
- [Implement Rate Limiting in Flask - CodezUp](https://codezup.com/implementing-rate-limiting-in-flask-api-security/)

### MongoDB Security
- [NoSQL Injection - CodeQL Query Help](https://codeql.github.com/codeql-query-help/python/py-nosql-injection/)
- [Secure Your Data - PyMongo Driver Official Docs](https://www.mongodb.com/docs/languages/python/pymongo-driver/current/security/)
- [Securing MongoDB from External Injection Attacks - Severalnines](https://severalnines.com/blog/securing-mongodb-external-injection-attacks/)
- [7 Best Practices for MongoDB Atlas Credentials - DEV Community](https://dev.to/arunangshu_das/7-best-practices-for-mongodb-atlas-credentials-in-the-cloud-2c6l)

### React Security
- [React XSS Guide - StackHawk](https://www.stackhawk.com/blog/react-xss-guide-examples-and-prevention/)
- [Preventing XSS in React Part 2 - Pragmatic Web Security](https://pragmaticwebsecurity.com/articles/spasecurity/react-xss-part2)
- [How to Secure React Against XSS with HTTP-Only Cookies - DigitalOcean](https://www.digitalocean.com/community/tutorials/how-to-secure-react-applications-against-xss-attacks-with-http-only-cookies)
- [JWT Storage in React: localStorage vs Cookies - CyberSierra](https://cybersierra.co/blog/react-jwt-storage-guide/)
- [How to Securely Store JWT Tokens in Cookies - Medium Feb 2026](https://medium.com/@oviyan007/how-to-securely-store-jwt-tokens-in-cookies-avoid-xss-risks-13812db41c34)
- [OWASP XSS Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)

### Code Quality Tooling
- [Effortless Code Quality: Pre-Commit Hooks Guide 2025 - Medium](https://gatlenculp.medium.com/effortless-code-quality-the-ultimate-pre-commit-hooks-guide-for-2025-57ca501d9835)
- [Why Replace Flake8/Black/isort with Ruff - Medium](https://medium.com/@zigtecx/why-you-should-replace-flake8-black-and-isort-with-ruff-the-ultimate-python-code-quality-tool-a9372d1ddc1e)
- [Ruff 0.6 Pre-Commit Configuration 2025](https://johal.in/ruff-0-6-pre-commit-git-hooks-configuration-2025/)
- [eslint-plugin-security - npm (eslint-community)](https://www.npmjs.com/package/eslint-plugin-security)
- [Microsoft eslint-plugin-sdl - GitHub](https://github.com/microsoft/eslint-plugin-sdl)
- [pre-commit official site](https://pre-commit.com/)
- [Bandit Python SAST Guide - DEV Community](https://dev.to/angelvargasgutierrez/bandit-python-static-application-security-testing-guide-47l0)
- [Safety + Bandit Security Testing Tutorial - Krython](https://krython.com/tutorial/python/security-testing-bandit-and-safety/)
- [How to Set Up ESLint and Prettier for React 2025 - DEV Community](https://dev.to/marina_eremina/how-to-set-up-eslint-and-prettier-for-react-app-in-vscode-2025-2341)
