# Technology Stack

**Analysis Date:** 2026-03-26

## Languages

**Primary:**
- JavaScript (ES6+) - Used in all frontend React applications
- Python 3 - Used in backend API server
- TypeScript - Used in generated frontend variants (`frontend_react_gen1440`, `frontend_react_generated`)

**Markup/Style:**
- HTML5 - Frontend markup
- CSS3 - Styling in React components
- JSX - React component syntax

## Runtime

**Environment:**
- Node.js v22.18.0 - JavaScript/React runtime
- Python (version unspecified in backend) - Backend API runtime

**Package Managers:**
- npm - Primary package manager for all Node.js projects
- Lockfiles: `package-lock.json` present in root and all frontend directories

## Frameworks

**Frontend:**
- React 18.2.0 - UI framework across all frontend variants
  - `frontend_react/` - Main React implementation
  - `frontend_react_old/` - Previous version with additional dependencies
  - `frontend_react_gen1440/` - Generated TypeScript variant
  - `frontend_react_generated/` - Auto-generated variant

**Backend:**
- Flask (Python) - REST API framework in `backend/api_be.py`

**Build & Development:**
- react-scripts 5.0.1 - Create React App build tooling
- Babel - JavaScript transpilation with macros plugin (`babel.config.js`)
- TypeScript 4.5.4 - In generated frontend variants (tsconfig.json in `frontend_react_gen1440/` and `frontend_react_generated/`)

## Key Dependencies

**Critical (Frontend):**
- react@18.2.0 - Core React library
- react-dom@18.2.0 - React DOM rendering
- react-router-dom@6.2.1 - Client-side routing (in generated variants)
- react-scripts@5.0.1 - Build and development tooling

**UI & Styling:**
- @mui/material@5.11.13 - Material-UI component library (frontend_react_old)
- @emotion/react@11.10.6 - CSS-in-JS styling (frontend_react_old)
- @emotion/styled@11.10.6 - Styled components helper (frontend_react_old)
- styled-components@5.3.9 - CSS-in-JS library (frontend_react_old)
- bootstrap@5.2.3 - Bootstrap CSS framework (all frontends)

**Icons & UI Components:**
- @fortawesome/react-fontawesome@0.2.0 - Font Awesome icon integration (frontend_react_old)
- @fortawesome/fontawesome-svg-core@6.4.0 - Font Awesome core (frontend_react_old)
- @fortawesome/free-solid-svg-icons@6.4.0 - Solid icon set (frontend_react_old)
- @fortawesome/free-regular-svg-icons@6.4.0 - Regular icon set (frontend_react_old)
- react-material-symbols@3.0.2 - Material Design symbols
- react-tabs@6.0.0 - Tab component library

**HTTP Client:**
- axios@1.3.4 - HTTP client for API calls (frontend_react_old)

**Testing:**
- @testing-library/react@13.4.0 - React component testing
- @testing-library/jest-dom@5.16.5 - Jest DOM matchers
- @testing-library/user-event@13.5.0 - User event simulation
- web-vitals@2.1.4 - Core Web Vitals metrics

**Backend (Python):**
- Flask - Web framework (imported in `backend/api_be.py`)
- pymongo - MongoDB Python driver (imported in `backend/api_be.py`)

## Configuration

**Build Configuration:**
- `frontend_react/babel.config.js` - Babel transpilation with macros plugin
- `frontend_react_old/babel.config.js` - Same babel config in old version
- `frontend_react_gen1440/tsconfig.json` - TypeScript config with ES5 target
- `frontend_react_generated/tsconfig.json` - TypeScript config with ES5 target

**Environment:**
- `.env` files present in `frontend_react/` and `frontend_react_old/` (credentials not analyzed per policy)
- DISABLE_ESLINT_PLUGIN=true set in `frontend_react/.env`

**Linting & Code Quality:**
- ESLint - Configured via react-app preset in `eslintConfig` in package.json
- babel-eslint@10.1.0 - ESLint parser for Babel (frontend_react_old)
- eslint@8.37.0 - ESLint linter (frontend_react_old)
- Prettier@2.8.7 - Code formatter (root package.json)

## Platform Requirements

**Development:**
- Node.js 22.18.0 or compatible LTS version
- npm for package management
- Python 3.x for backend development
- Modern browser (Chrome, Firefox, Safari for React development)

**Production:**
- Node.js server for frontend (built bundle deployable via static hosting or Node server)
- Python application server for Flask backend (e.g., Gunicorn, uWSGI)
- MongoDB instance for data storage
- CDN/static hosting for built React bundle recommended

## Notable Observations

- Multiple frontend implementations coexist: main React implementation (`frontend_react`), legacy version (`frontend_react_old`), and generated TypeScript variants
- Latest frontend uses minimal dependencies, while `frontend_react_old` includes Material-UI and Emotion for more sophisticated UI
- Backend is minimal Flask API with no explicit API documentation tooling (e.g., no Swagger/OpenAPI)
- No containerization files found (no Dockerfile at root)
- Root `package.json` contains only formatting and symbol dependencies, not the main app

---

*Stack analysis: 2026-03-26*
