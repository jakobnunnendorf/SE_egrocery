# Codebase Structure

**Analysis Date:** 2026-03-26

## Directory Layout

```
SE_egrocery/
├── backend/                              # Python Flask backend API
│   └── api_be.py                        # Main API endpoints (products, cart, purchase)
├── frontend_react/                       # Manual React implementation (in progress)
│   ├── src/
│   │   ├── App.js                       # Root app component with cart management
│   │   ├── index.js                     # React DOM entry point
│   │   ├── App.css                      # App-level styling
│   │   ├── index.css                    # Global styles
│   │   ├── Components/                  # Component directory (structure planned but not created)
│   │   │   ├── Header/
│   │   │   ├── Body/
│   │   │   └── Footer/
│   │   └── media/                       # Image assets
│   ├── public/                          # Static public assets
│   ├── package.json                     # Dependencies and scripts
│   └── babel.config.js                  # Babel configuration for macros
├── frontend_react_generated/            # Auto-generated React (TypeScript)
│   ├── src/
│   │   ├── App.tsx                      # React Router wrapper
│   │   ├── index.tsx                    # React DOM entry point with BrowserRouter
│   │   ├── global.css                   # Global styles with CSS variables
│   │   ├── components/                  # UI components (generated)
│   │   │   ├── HeaderContainer.tsx      # Header with logo and account info
│   │   │   ├── ContainerHeaderSecondRow.tsx # Navigation and search
│   │   │   ├── EGroceryContainer.tsx    # Product grid display
│   │   │   └── ItemContainer.tsx        # Individual product card
│   │   └── pages/
│   │       └── FrameComponent.tsx       # Main page layout
│   ├── public/                          # Static assets (images, promo-header@2x.png)
│   ├── tsconfig.json                    # TypeScript configuration
│   └── package.json                     # Dependencies
├── frontend_react_gen1440/              # Another variant of generated React
│   ├── src/                             # Same structure as frontend_react_generated
│   │   ├── App.tsx
│   │   ├── index.tsx
│   │   ├── components/
│   │   └── pages/
│   ├── tsconfig.json
│   └── package.json
├── frontend_html_generated/             # Pure HTML/CSS generated version
│   ├── public/                          # Static HTML files
│   └── package.json
├── frontend_HTML_gen1440/               # Another HTML variant
├── frontend_react_old/                  # Legacy/previous implementation
├── gui_assets/                          # Design assets and mockups
├── .planning/
│   └── codebase/                        # Architecture documentation (this location)
└── README.md                            # Project requirements and methodology

```

## Directory Purposes

**`backend/`:**
- Purpose: Flask REST API server handling product data and transactions
- Contains: Python Flask application, MongoDB connection, API route handlers
- Key files: `api_be.py` - all backend logic in single file

**`frontend_react/`:**
- Purpose: Hand-written React implementation (in development)
- Contains: React component structure (planned), CSS styling, Bootstrap integration, assets
- Key files: `App.js` (cart and auth state management), `index.js` (entry point)
- Status: Partially implemented - component files referenced but not created

**`frontend_react_generated/`:**
- Purpose: Auto-generated TypeScript React from design tool (primary active implementation)
- Contains: Fully typed React components, CSS Module styling, routing setup
- Key files: `App.tsx` (router), `pages/FrameComponent.tsx` (main page), components for UI elements

**`frontend_react_gen1440/`:**
- Purpose: Variant of generated React (different resolution/breakpoint)
- Contains: Same structure as frontend_react_generated with minor differences
- Key files: Parallel structure with TypeScript components

**`gui_assets/`:**
- Purpose: Design mockups and visual specifications
- Contains: Design source files (likely Figma exports or similar)

**`.planning/codebase/`:**
- Purpose: Architecture documentation for code navigation and development guidance
- Contains: ARCHITECTURE.md, STRUCTURE.md, CONVENTIONS.md, TESTING.md, CONCERNS.md

## Key File Locations

**Entry Points:**
- `frontend_react/src/index.js`: React manual implementation entry
- `frontend_react_generated/src/index.tsx`: Generated React entry (BrowserRouter wrapper)
- `backend/api_be.py`: Flask app initialization (line 77: `app.run(debug=True)`)

**Configuration:**
- `frontend_react_gen1440/tsconfig.json`: TypeScript compiler options (target: es5, jsx: react-jsx)
- `frontend_react/babel.config.js`: Babel macro support
- `frontend_react/package.json`: Dependencies (React 18, Bootstrap, Stripe, EmailJS)
- `backend/api_be.py` line 7: MongoDB connection string (localhost:27017)

**Core Logic:**
- `frontend_react/src/App.js`: Cart management (`addItemToCart`, `removeItemFromCart`), auth state, search state
- `backend/api_be.py`: All API endpoints - `/products`, `/categories`, `/cart`, `/purchase`

**Styling:**
- `frontend_react_generated/src/global.css`: CSS variables, typography, colors, spacing (responsive design)
- `frontend_react_generated/src/components/*.module.css`: Component-scoped styles (e.g., HeaderContainer.module.css)
- `frontend_react/src/App.css`: Manual React styling
- `frontend_react/src/index.css`: Global styles for manual implementation

**Assets:**
- `frontend_react/src/media/`: Image assets for manual React (logo.png)
- `frontend_react_generated/public/`: Static assets (promo-header@2x.png, vector icons)

## Naming Conventions

**Files:**
- React components: PascalCase (`HeaderContainer.tsx`, `EGroceryContainer.tsx`)
- CSS modules: Component name + `.module.css` (e.g., `HeaderContainer.module.css`)
- Pages: PascalCase ending with `Component` (e.g., `FrameComponent.tsx`)
- Configuration: lowercase with dots (e.g., `tsconfig.json`, `babel.config.js`)
- Python files: lowercase with underscores (e.g., `api_be.py`)

**Directories:**
- React src subdirectories: lowercase (`components/`, `pages/`)
- Feature directories: lowercase (`media/`, `public/`)
- Multi-word directories: snake_case or lowercase joined (e.g., `frontend_react_generated`, `gui_assets`)

**Components:**
- TypeScript: `export const ComponentName: FunctionComponent = () => { ... }`
- Functional components using React hooks
- Props not explicitly typed in initial implementation (relying on inference)

**Functions/Methods:**
- camelCase for functions (`addItemToCart`, `removeItemFromCart`, `get_products`)
- API endpoint handlers: lowercase with underscores matching routes (`get_products`, `update_database`)

## Where to Add New Code

**New React Feature (in `frontend_react/`):**
- Component implementation: `frontend_react/src/Components/[FeatureName]/[ComponentName].js`
- Styling: `frontend_react/src/Components/[FeatureName]/[ComponentName].css`
- Integration: Import in parent component, add to JSX tree
- Example: Header component should go in `frontend_react/src/Components/Header/Header.js`

**New Generated Component (in `frontend_react_generated/`):**
- Component file: `frontend_react_generated/src/components/NewComponent.tsx`
- Styling: `frontend_react_generated/src/components/NewComponent.module.css`
- Integration: Import in parent component, add to JSX tree
- Pattern: Follow existing component structure (FunctionComponent type, CSS Module import)

**New API Endpoint (in `backend/`):**
- Add route handler in `backend/api_be.py`
- Pattern: `@app.route('/endpoint-name', methods=['GET/POST'])`
- Database: Use existing `collection` MongoDB object
- Return: `jsonify(result_data)` for JSON responses

**Utilities/Helpers:**
- Shared React utilities: `frontend_react/src/utils/` (create as needed)
- API client abstraction: Create `frontend_react/src/services/api.js` for centralized API calls
- MongoDB utilities: Add helper functions at top of `backend/api_be.py`

## Special Directories

**`node_modules/`:**
- Purpose: npm package dependencies
- Generated: Yes (by `npm install`)
- Committed: No (in .gitignore)

**`public/`:**
- Purpose: Static files served directly by web server
- Contains: `index.html`, images, favicons, manifest files
- Generated: No
- Committed: Yes

**`build/` or `dist/`:**
- Purpose: Compiled/bundled application for production
- Generated: Yes (by `npm run build`)
- Committed: No (in .gitignore)

**`.next/` (if Next.js used):**
- Purpose: Next.js build cache and output
- Generated: Yes
- Committed: No

**`gui_assets/`:**
- Purpose: Design system and visual mockups
- Contains: Design files, color palettes, typography specs
- Generated: No (manual design exports)
- Committed: Yes

---

*Structure analysis: 2026-03-26*
