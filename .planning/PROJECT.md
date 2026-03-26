# eGrocery — Full-Stack E-Commerce Rebuild

## What This Is

A production-ready e-grocery web application rebuilt from an existing React + Flask + MongoDB codebase. Portfolio/demo project showcasing clean architecture, test coverage, containerized deployment, and modern development practices across a consolidated single frontend, REST API with OpenAPI docs, and MongoDB data layer.

## Core Value

A complete, professional-quality e-commerce experience — browsing, cart, checkout, auth, and admin — that demonstrates production-grade engineering practices.

## Requirements

### Validated

<!-- Inferred from existing codebase — these features exist and work. -->

- ✓ Product catalog display with category filtering — existing in frontend_react + backend
- ✓ Shopping cart with add/remove/quantity management — existing in App.js state
- ✓ Basic checkout flow with purchase processing — existing /purchase endpoint
- ✓ User signup/login UI — existing AccountPage components
- ✓ Flask REST API serving product data — existing api_be.py

### Active

<!-- Current scope — the rebuild targets. -->

- [ ] Consolidate multiple frontends into single clean React app
- [ ] Production-quality React component architecture (proper state management, error boundaries)
- [ ] Robust Flask API with input validation, error handling, and OpenAPI/Swagger docs
- [ ] Real authentication system (JWT/session-based, not just a boolean flag)
- [ ] Product catalog with search, filtering, sorting, and pagination
- [ ] Full shopping cart with persistent state (server-synced, not just local)
- [ ] Complete checkout flow with Stripe payment integration
- [ ] User accounts with order history and profile management
- [ ] Admin panel for product management, inventory, and order tracking
- [ ] Comprehensive test suite (unit, integration, E2E)
- [ ] Docker/Docker Compose containerized deployment
- [ ] Responsive design preserving current visual style
- [ ] MongoDB schema design with proper indexes and validation

### Out of Scope

- Mobile native app — web-only for this version
- Multi-vendor marketplace — single store only
- Real-time features (chat, live inventory) — unnecessary complexity for portfolio
- Internationalization / multi-language — English only
- CI/CD pipeline — containerization is sufficient for demo

## Context

- **Existing codebase**: Multiple frontend variants (frontend_react, frontend_react_old, frontend_react_generated, frontend_react_gen1440) plus static HTML frontend. Only frontend_react/ is the active implementation.
- **Backend**: Minimal Flask API (api_be.py, ~77 lines) with no auth, no validation, no error handling. Connects to local MongoDB.
- **Current issues**: No real auth (boolean flag), no error handling anywhere, no tests, no input validation, multiple redundant frontends, no containerization, hardcoded MongoDB connection.
- **Design**: Keep existing visual style (Bootstrap-based, custom CSS). Focus on code quality over visual redesign.

## Constraints

- **Tech stack**: React 18 + Flask + MongoDB — keep current stack, modernize patterns
- **Design**: Preserve current look and feel — this is a code quality rebuild, not a redesign
- **Quality**: Production-ready — full error handling, tests, security, responsive design
- **Deployment**: Must run via Docker Compose with a single command

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Keep React + Flask + MongoDB stack | User preference; focus on code quality not stack migration | — Pending |
| Consolidate to single frontend | 4+ frontends create confusion; single source of truth | — Pending |
| JWT-based auth over sessions | Stateless, API-friendly, industry standard for SPAs | — Pending |
| OpenAPI/Swagger for API docs | Industry standard, auto-generates client docs | — Pending |
| Docker Compose deployment | Simple, reproducible, good for portfolio demos | — Pending |

---
*Last updated: 2026-03-26 after project initialization*
