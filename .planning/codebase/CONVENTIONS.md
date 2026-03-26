# Coding Conventions

**Analysis Date:** 2026-03-26

## Naming Patterns

**Files:**
- React components: PascalCase (e.g., `HeaderContainer.tsx`, `ItemContainer.tsx`, `FrameComponent.tsx`)
- CSS modules: PascalCase with `.module.css` suffix (e.g., `HeaderContainer.module.css`)
- Utility/utility files: camelCase (e.g., `reportWebVitals.tsx`)
- Type definition files: `.d.ts` (e.g., `typings.d.ts`)

**Functions:**
- React components: Declared as `const ComponentName: FunctionComponent = () => {}` or `function ComponentName() {}`
- Regular functions: camelCase arrow functions or function declarations
- Event handlers: camelCase (e.g., `addItemToCart`, `removeItemFromCart`)
- Callback/utility functions: camelCase (e.g., `reportWebVitals`)

**Variables:**
- Component props and state: camelCase (e.g., `activeBodyComponent`, `cartProp`, `nOfCartItems`)
- DOM elements: camelCase (e.g., `container`, `root`)
- Constants: camelCase (e.g., `action`, `location`, `pathname`, `title`, `metaDescription`)
- Accumulated results: camelCase descriptive names (e.g., `accumulator`, `itemIndex`)

**Types:**
- React type annotations: `FunctionComponent` (imported from React)
- DOM type annotations: Specific types like `HTMLMetaElement | null`
- Type declarations in modules: Interface names like `IClassNames`
- Optional parameters: Indicated with `?` (e.g., `onPerfEntry?: ReportHandler`)

## Code Style

**Formatting:**
- Prettier is installed in root `package.json` (v2.8.7) but no dedicated `.prettierrc` file found
- Implicit formatting follows standard React patterns: 2-space indentation
- Semicolons are consistently used at end of statements
- Import statements properly formatted with line breaks for multiple imports

**Linting:**
- ESLint configuration present in `frontend_react_old/package.json` with `babel-eslint` parser
- React app extends: `"react-app"` and `"react-app/jest"` in `frontend_react_old`
- TypeScript projects use strict mode: `"strict": true` in `tsconfig.json`
- Generated projects have empty `eslintConfig` (uses create-react-app defaults)

## Import Organization

**Order:**
1. React and library imports (e.g., `import React from "react"`, `import { FunctionComponent } from "react"`)
2. React Router imports (e.g., `import { Routes, Route, useNavigationType } from "react-router-dom"`)
3. Local component imports (e.g., `import HeaderContainer from "../components/HeaderContainer"`)
4. Local utilities (e.g., `import reportWebVitals from "./reportWebVitals"`)
5. CSS/styles (e.g., `import styles from "./HeaderContainer.module.css"`, `import "./global.css"`)

**Path Aliases:**
- No path aliases detected; relative imports used throughout
- CSS modules imported as `styles` constant

## Error Handling

**Patterns:**
- Minimal error handling detected in current codebase
- Type assertions for non-null values: `const container = document.getElementById("root");` followed by `createRoot(container!);`
- Conditional checks before DOM manipulation: `if (metaDescriptionTag) { metaDescriptionTag.content = metaDescription; }`
- No try-catch blocks found in TypeScript components
- No explicit error boundaries detected
- Backend uses basic existence checks: `if (product_info['stock'] >= item['quantity'])`

## Logging

**Framework:** `console` (built-in)

**Patterns:**
- Commented-out debug logging: `//print(request.json) # print the JSON object (debugging)`
- Performance logging via `reportWebVitals()` callback pattern
- No structured logging library used
- Backend logging minimal; primarily comments for intent

## Comments

**When to Comment:**
- Inline comments explain purpose: `// for the styling of the app frame`
- Comments precede import groups: `// import the components rendered in the app frame`
- Comments describe state intent: `// by default the home page component is active`
- Commented-out code preserved for reference (e.g., alternate implementation in `api_be.py`)
- Backend uses comments to clarify assumptions: `# assume filter object is passed in as JSON`

**JSDoc/TSDoc:**
- Not used; no function/component documentation blocks found
- React component parameters passed as props without documentation

## Function Design

**Size:** Components and functions are small and focused (15-30 lines typical)

**Parameters:**
- React components take no parameters; state managed internally with hooks or via props
- Functions receive needed dependencies: `addItemToCart(product)`
- Optional parameters marked with `?`: `(onPerfEntry?: ReportHandler)`
- Default parameters used in hooks: `useState('home')`

**Return Values:**
- React components return JSX elements
- Event handlers return nothing (void)
- Utility functions return expected values (arrays, objects)
- No early returns; clear single return path preferred
- Array reduce for aggregation: `.reduce((accumulator, item) => accumulator + item.quantity, 0)`

## Module Design

**Exports:**
- Named exports for utilities (e.g., type definitions in `typings.d.ts`)
- Default exports for React components: `export default ComponentName`
- Single responsibility: One component per file

**Barrel Files:**
- Not used; components imported directly from their source files
- No index.ts files aggregating exports detected

## TypeScript Configuration

**Key Settings (`tsconfig.json`):**
- Target: `es5`
- Strict mode: `true` (enforces strict null checks and type safety)
- JSX: `react-jsx` (new JSX transform)
- Module resolution: `node`
- JSON modules enabled: `"resolveJsonModule": true`
- No fallthrough cases: `"noFallthroughCasesInSwitch": true`
- ESModuleInterop: `true`

## CSS & Styling

**Pattern:**
- CSS Modules for component styling (one `.module.css` per component)
- Styles imported as object: `import styles from "./HeaderContainer.module.css"`
- Global styles imported directly: `import "./global.css"`
- className references use dot notation: `className={styles.header}`, `className={styles.itemBox}`
- No inline styles detected; all styling via CSS modules

---

*Convention analysis: 2026-03-26*
