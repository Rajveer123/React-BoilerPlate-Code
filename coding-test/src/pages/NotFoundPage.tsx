import NotFoundIcon from '@mui/icons-material/ErrorOutline';
import { Box, Button, Container, Paper, Typography } from '@mui/material';
import { type ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { ROUTES } from '@config/routes';

function NotFoundPage(): ReactElement {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '80vh',
        }}
      >
        <Paper elevation={3} sx={{ p: 4, textAlign: 'center', width: '100%' }}>
          <NotFoundIcon sx={{ fontSize: 80, color: 'error.main', mb: 2 }} />
          <Typography variant="h2" component="h1" gutterBottom>
            404
          </Typography>
          <Typography variant="h5" color="text.secondary" gutterBottom>
            {t('error.notFound.title')}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            {t('error.notFound.message')}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate(ROUTES.home)}
            size="large"
          >
            {t('error.notFound.goHome')}
          </Button>
        </Paper>
      </Box>
    </Container>
  );
}

export default NotFoundPage;
