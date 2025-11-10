import PeopleIcon from '@mui/icons-material/Groups';
import RefreshIcon from '@mui/icons-material/Refresh';
import { Box, Button, Container, Paper, Stack, Typography } from '@mui/material';
import { type ReactElement } from 'react';

import { PageLoader } from '@components/feedback';
import logger from '@lib/logger';

import EmployeeTable from '../components/EmployeeTable';
import { useEmployees } from '../hooks/useEmployees';

function EmployeesPage(): ReactElement {
  const { data: employees = [], isLoading, isError, error, refetch, isRefetching } = useEmployees();

  if (isLoading) {
    return <PageLoader message="Loading employees" />;
  }

  if (isError) {
    logger.error('Failed to load employees', error);
    return (
      <Container maxWidth="lg">
        <Paper elevation={2} sx={{ p: 4, mt: 6, textAlign: 'center' }}>
          <Typography variant="h5" color="error" gutterBottom>
            Unable to load employees
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Please check your network connection or try again later.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<RefreshIcon />}
            onClick={() => refetch()}
          >
            Retry
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Stack spacing={3} sx={{ py: 4 }}>
        <Paper elevation={0} sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
          <PeopleIcon color="primary" sx={{ fontSize: 48 }} />
          <Box>
            <Typography variant="h4" component="h1" fontWeight={600}>
              Employee Directory
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Manage team information, departments, and compensation
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Button
            variant="outlined"
            startIcon={<RefreshIcon />}
            onClick={() => refetch()}
            disabled={isRefetching}
          >
            Refresh
          </Button>
        </Paper>

        <Paper elevation={0} sx={{ p: 3 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
            <Typography variant="h6" component="h2">
              {employees.length} team members
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Data provided by mock service. Connect your API by setting `VITE_API_BASE_URL`.
            </Typography>
          </Stack>
          <EmployeeTable employees={employees} />
        </Paper>
      </Stack>
    </Container>
  );
}

export default EmployeesPage;
