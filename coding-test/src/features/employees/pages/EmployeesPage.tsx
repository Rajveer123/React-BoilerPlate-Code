import PeopleIcon from '@mui/icons-material/Groups';
import RefreshIcon from '@mui/icons-material/Refresh';
import { Box, Button, Container, Paper, Stack, Typography } from '@mui/material';
import { type ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

import { PageLoader } from '@components/feedback';
import { LanguageSwitcher } from '@components/language';
import logger from '@lib/logger';

import EmployeeTable from '../components/EmployeeTable';
import { useEmployees } from '../hooks/useEmployees';

function EmployeesPage(): ReactElement {
  const { t } = useTranslation();
  const { data: employees = [], isLoading, isError, error, refetch, isRefetching } = useEmployees();

  if (isLoading) {
    return <PageLoader message={t('employees.loading')} />;
  }

  if (isError) {
    logger.error('Failed to load employees', error);
    return (
      <Container maxWidth="lg">
        <Paper elevation={2} sx={{ p: 4, mt: 6, textAlign: 'center' }}>
          <Typography variant="h5" color="error" gutterBottom>
            {t('employees.error')}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            {t('employees.errorMessage')}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<RefreshIcon />}
            onClick={() => refetch()}
          >
            {t('common.retry')}
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Stack spacing={3} sx={{ py: 4, position: 'relative' }}>
        <Box sx={{ position: 'absolute', top: 16, right: 16, zIndex: 1 }}>
          <LanguageSwitcher />
        </Box>
        <Paper elevation={0} sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
          <PeopleIcon color="primary" sx={{ fontSize: 48 }} />
          <Box>
            <Typography variant="h4" component="h1" fontWeight={600}>
              {t('employees.title')}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {t('employees.subtitle')}
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Button
            variant="outlined"
            startIcon={<RefreshIcon />}
            onClick={() => refetch()}
            disabled={isRefetching}
          >
            {t('common.refresh')}
          </Button>
        </Paper>

        <Paper elevation={0} sx={{ p: 3 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
            <Typography variant="h6" component="h2">
              {t('employees.teamMembersCount', { count: employees.length })}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t('employees.mockDataNotice')}
            </Typography>
          </Stack>
          <EmployeeTable employees={employees} />
        </Paper>
      </Stack>
    </Container>
  );
}

export default EmployeesPage;
