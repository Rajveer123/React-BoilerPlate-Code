import { lazy, Suspense, type ReactElement } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import PageLoader from '@components/feedback/PageLoader';
import { ROUTES } from '@config/routes';

// Lazy load pages for code splitting
const HomePage = lazy(() => import('@pages/HomePage'));
const NotFoundPage = lazy(() => import('@pages/NotFoundPage'));
const EmployeesPage = lazy(() => import('@features/employees/pages/EmployeesPage'));

function AppRouter(): ReactElement {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path={ROUTES.home} element={<HomePage />} />
          <Route path={ROUTES.employees} element={<EmployeesPage />} />
          <Route path={ROUTES.notFound} element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default AppRouter;
