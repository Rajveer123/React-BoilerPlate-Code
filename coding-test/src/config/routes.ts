export const ROUTES = {
  home: '/',
  employees: '/employees',
  notFound: '*',
} as const;

export type AppRouteKey = keyof typeof ROUTES;

export const NAVIGATION_ROUTES: Array<{ key: AppRouteKey; label: string; path: string }> = [
  { key: 'home', label: 'Dashboard', path: ROUTES.home },
  { key: 'employees', label: 'Employees', path: ROUTES.employees },
];

export default ROUTES;
