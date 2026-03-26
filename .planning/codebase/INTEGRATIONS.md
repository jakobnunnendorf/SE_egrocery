# External Integrations

**Analysis Date:** 2026-03-26

## APIs & External Services

**Payment Processing (Not Currently Integrated):**
- Stripe - SDK available in `frontend_react_old` package.json
  - SDK: @stripe/stripe-js@1.52.0 and @stripe/react-stripe-js@2.1.0
  - Status: Dependencies present but not found imported in analyzed code
  - Located: `frontend_react_old/package.json`

**Email Service (Not Currently Integrated):**
- EmailJS - SDK available in `frontend_react_old` package.json
  - SDK: @emailjs/browser@3.10.0 and emailjs@4.0.1
  - Status: Dependencies present but imports not detected in source files
  - Located: `frontend_react_old/package.json`
  - Use case: Likely for confirmation emails and user notifications

**Backend API:**
- Custom Flask REST API
  - Location: `backend/api_be.py`
  - Endpoints: `/products`, `/categories`, `/cart`, `/purchase`
  - Method: HTTP GET/POST via request.json
  - Client: Frontend uses axios (in old version) for HTTP requests

## Data Storage

**Primary Database:**
- MongoDB
  - Client: pymongo MongoDB Python driver
  - Connection: `mongodb://localhost:27017/` (hardcoded in `backend/api_be.py`)
  - Database name: `mydatabase`
  - Collection: `mycollection`
  - Location: `backend/api_be.py` lines 6-9

**Data Persistence:**
- Server-side: MongoDB documents for products, categories, inventory, purchases
- Client-side: React state management (useState) for cart in `frontend_react/src/App.js`

**File Storage:**
- Local filesystem only - Images referenced in `public/` directories
- GUI assets in `gui_assets/` directory for design materials

## Authentication & Identity

**Status:** Not fully implemented

**Current State:**
- Basic account status flag in frontend state: `accountStatus` (boolean) in `frontend_react/src/App.js`
- No authentication provider integrated
- No password encryption or hashing detected in code analysis
- README mentions security requirement for SHA-2 hashing (Priority 5 feature)

**Auth Approach:**
- Custom (if implemented) would likely be handled in Flask backend
- Frontend has signup/login component structure but implementation not visible in main app

## Monitoring & Observability

**Error Tracking:**
- None detected

**Logging:**
- Backend: Flask debug mode logging (`app.run(debug=True)` in `backend/api_be.py`)
- Frontend: Console logging via React (no explicit logging framework)

**Performance Metrics:**
- web-vitals@2.1.4 - Core Web Vitals measurement (installed but usage not analyzed)

## CI/CD & Deployment

**Hosting:**
- Not configured - no deployment platform detected
- Suitable for: GitHub Pages, Vercel, Netlify (for frontend), or traditional server (for backend)

**CI Pipeline:**
- None detected - no GitHub Actions, GitLab CI, or similar configuration files

**Build Output:**
- Frontend: Create React App build artifacts in `build/` directories (created by `npm run build`)
- Backend: Python source runs directly via Flask development server

## Environment Configuration

**Frontend Environment Variables:**
- `.env` file present in `frontend_react/` and `frontend_react_old/`
- DISABLE_ESLINT_PLUGIN=true (disables ESLint plugin warnings)
- No API endpoint environment variables detected in code

**Backend Environment Variables:**
- MongoDB connection hardcoded as `mongodb://localhost:27017/`
- No environment-based configuration detected

**Required for Running:**
- MongoDB server listening on localhost:27017
- Python 3 with flask and pymongo installed
- Node.js and npm for frontend development

## Webhooks & Callbacks

**Incoming:**
- None detected

**Outgoing:**
- None detected

## API Endpoints (Backend)

**Location:** `backend/api_be.py`

**Implemented Endpoints:**

- **GET /products**
  - Purpose: Retrieve filtered product list
  - Input: Filter object passed as request.json
  - Output: JSON array of products from MongoDB

- **GET /categories**
  - Purpose: Retrieve filtered categories
  - Input: Filter object passed as request.json
  - Output: JSON array of categories from MongoDB

- **GET /cart**
  - Purpose: Check availability of items in cart
  - Input: Global cart_products variable (not shown in API)
  - Output: JSON with available_products and unavailable_products arrays
  - Logic: Checks MongoDB for stock >= requested quantity

- **POST /purchase**
  - Purpose: Process purchase and update inventory
  - Input: JSON body with cart_items array
  - Output: JSON array of successfully purchased items
  - Side Effect: Decrements product stock in MongoDB

**Not Implemented (Commented Out):**
- Alternative cart endpoint (lines 26-35 in api_be.py)

## External CDN/Resources

**Third-Party CSS:**
- Bootstrap CSS via CDN: https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css (in HTML)
- Google Fonts: Imported via CSS @import for Manrope, Noto Sans SC, Unbounded fonts (`frontend_react/src/App.css`)

## Missing Integrations (Mentioned in README but Not Implemented)

**Future Integration Candidates:**
- User authentication system (Priority 5 in README)
- Payment gateway (Stripe SDKs available)
- Email notifications (EmailJS SDKs available)
- Delivery/shipping integration (mentioned as possible addon)

---

*Integration audit: 2026-03-26*
