# React Boilerplate (Vite + TypeScript + MUI + React Query)

Production-ready React boilerplate with feature-first structure, strong typing, routing, theming, data fetching and developer tooling.

## Quick start

```
npm install
npm run dev
```

Build & preview:

```
npm run build
npm run preview
```

## High-level architecture

- Build/runtime: Vite + React 19 + TypeScript (strict), path aliases.
- UI: Material UI (MUI) theme + `CssBaseline`.
- Routing: `react-router-dom` with lazy routes and `Suspense` fallback.
- Data fetching: React Query with sensible defaults and DevTools in development.
- HTTP: Centralized Axios instance with request/response interceptors.
- Config: `config/env.ts` (Vite env mapping, mode flags), `config/routes.ts` (route constants).
- Error handling: App-level `ErrorBoundary` and `PageLoader` component.
- Feature modules: Feature-first directories (example: `employees`).
- Utilities: Date/number/currency formatting, validation, lightweight logger.
- Code quality: ESLint (flat config) + TypeScript-ESLint + Prettier.

## Folder structure

```
src/
  api/                    # Axios instance (baseURL, interceptors)
  components/
    feedback/             # ErrorBoundary, PageLoader
  config/                 # env.ts (Vite env → config), routes.ts (paths)
  features/
    employees/            # Sample feature module
      api.ts              # API calls with mock fallback
      hooks/              # React Query hooks (e.g., useEmployees)
      components/         # Feature-specific UI (EmployeeTable)
      pages/              # Route pages (EmployeesPage)
      types.ts            # Feature types/interfaces
      index.ts            # Feature exports
  hooks/                  # App-level hooks (placeholder)
  layouts/                # App layouts (placeholder)
  lib/
    logger.ts             # Namespaced console logger
    react-query.tsx       # QueryClientProvider + DevTools
  pages/                  # App-level pages (HomePage, NotFoundPage)
  routes/
    AppRouter.tsx         # BrowserRouter + Suspense + lazy routes
  theme/
    theme.ts              # MUI theme overrides
  utils/
    format.ts             # Date/number/currency utilities
    validation.ts         # Validations (email, url, password strength, etc.)
    index.ts              # Barrel
  App.tsx                 # ErrorBoundary + AppRouter
  main.tsx                # Providers (React Query, Theme)
  App.css
```

### Path aliases

Configured in `tsconfig.json` and `vite.config.ts`:

```
@, @api, @components, @features, @hooks, @layouts,
@pages, @routes, @theme, @assets, @config, @utils, @lib
```

## Key implementation details

### Routing
- `routes/AppRouter.tsx` uses `BrowserRouter`, `Suspense`, and `PageLoader` for code splitting.
- Routes are defined using `config/routes.ts` constants.
- Example routes: `/` (Home), `/employees`, `*` (NotFound).

### Theming
- `theme/theme.ts` defines palette, typography, and component overrides.
- Applied via `ThemeProvider` in `main.tsx` with `CssBaseline`.

### Data fetching (React Query)
- `lib/react-query.tsx` exports `ReactQueryProvider` with `QueryClient` defaults:
  - `refetchOnWindowFocus: false`, `staleTime: 5m`, retries enabled in prod.
  - DevTools enabled in development only.
- Feature hooks (e.g., `features/employees/hooks/useEmployees.ts`) encapsulate fetching.

### HTTP client (Axios)
- `api/axiosInstance.ts` centralizes base URL (`config/env.ts`), headers, and interceptors:
  - Adds `Authorization` header from `localStorage` token.
  - 401 → redirect to `/login` (placeholder), logs 403/500 via `logger`.
  - Normalizes errors with `{ status, message, data }` shape.

### Config
- `config/env.ts` maps `import.meta.env` to a typed object with flags: `isDev`, `isProd`, `isTest`.
- `config/routes.ts` exports route constants and `NAVIGATION_ROUTES` for building menus.

### Error handling & UX
- `components/feedback/ErrorBoundary.tsx` catches render errors with a friendly UI.
- `components/feedback/PageLoader.tsx` shows loading states (fullscreen or inline).

### Utilities
- `utils/format.ts`: `formatDate`, `formatDateTime`, `formatRelativeTime`, `formatCurrency`,
  `formatCurrencyCompact`, `formatNumber`, `differenceInDays`, `formatDuration`, `truncateText`, `getInitials`.
- `utils/validation.ts`: `isEmail`, `isPhoneNumber`, `isUrl`, `isNumeric`, `isEmpty`,
  `hasMinLength`, `hasMaxLength`, `validateRequiredFields`, `validatePassword`.
- `lib/logger.ts`: small, environment-aware logger (debug/info/warn/error) with namespace.

## Scripts

- `npm run dev` – start dev server
- `npm run build` – production build
- `npm run preview` – preview production build
- `npm run lint` – ESLint (flat config) with TypeScript-ESLint + Prettier

## Environment

Define variables in `.env` files (Vite convention), e.g.:

```
VITE_API_BASE_URL=https://api.example.com
VITE_APP_NAME=React Boilerplate
```

## Conventions

- Feature-first structure: colocate feature API, hooks, components, pages, and types.
- Use React Query for server state; keep global UI/app state separate (e.g., future Redux slice).
- Prefer `import type { ... }` for type-only imports.
- Keep imports ordered and grouped (enforced by ESLint import/order).
- Use path aliases for clarity and refactorability.

## Extending

- Redux Toolkit: add `src/store/` (store + slices), wrap `<Provider>` in `main.tsx` for app/UI state.
- i18n: add `src/i18n/` with `i18next` setup, JSON locales, and wrap with `I18nextProvider`.
- Auth: add route guards, token refresh, and secure storage for credentials.
- Testing: add Jest/Vitest + React Testing Library and test utils per feature.

---

This boilerplate is intended as a strong starting point: opinionated, but easy to adapt. New developers can start by reading `main.tsx`, `App.tsx`, and `routes/AppRouter.tsx`, then browse `config/` and the `features/` examples.
