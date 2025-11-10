import { type ReactElement } from 'react';

import { ErrorBoundary } from '@components/feedback';
import AppRouter from '@routes/AppRouter';

function App(): ReactElement {
  return (
    <ErrorBoundary>
      <AppRouter />
    </ErrorBoundary>
  );
}

export default App;
