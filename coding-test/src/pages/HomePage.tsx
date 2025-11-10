import HomeIcon from '@mui/icons-material/Home';
import { Box, Button, Container, Paper, Stack, Typography } from '@mui/material';
import { type ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';

import { LanguageSwitcher } from '@components/language';
import { ROUTES } from '@config/routes';

function HomePage(): ReactElement {
  const { t } = useTranslation();

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4, position: 'relative' }}>
        <Box sx={{ position: 'absolute', top: 16, right: 16 }}>
          <LanguageSwitcher />
        </Box>
        <Paper elevation={2} sx={{ p: 4, textAlign: 'center' }}>
          <HomeIcon sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} />
          <Typography variant="h3" component="h1" gutterBottom>
            {t('home.title')}
          </Typography>
          <Typography variant="h6" color="text.secondary" paragraph>
            {t('home.subtitle')}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
            {t('home.featuresTitle')}
          </Typography>
          <Box
            component="ul"
            sx={{
              textAlign: 'left',
              display: 'inline-block',
              mt: 2,
              '& li': { mb: 1 },
            }}
          >
            <Typography component="li">{t('home.features.typescript')}</Typography>
            <Typography component="li">{t('home.features.router')}</Typography>
            <Typography component="li">{t('home.features.mui')}</Typography>
            <Typography component="li">{t('home.features.errorBoundaries')}</Typography>
            <Typography component="li">{t('home.features.codeSplitting')}</Typography>
            <Typography component="li">{t('home.features.axios')}</Typography>
            <Typography component="li">{t('home.features.reactQuery')}</Typography>
            <Typography component="li">{t('home.features.featureFirst')}</Typography>
          </Box>
          <Stack direction="row" justifyContent="center" sx={{ mt: 4 }}>
            <Button
              component={RouterLink}
              to={ROUTES.employees}
              variant="contained"
              color="primary"
              size="large"
            >
              {t('home.viewEmployees')}
            </Button>
          </Stack>
        </Paper>
      </Box>
    </Container>
  );
}

export default HomePage;
