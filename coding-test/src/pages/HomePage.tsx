import HomeIcon from '@mui/icons-material/Home';
import { Box, Button, Container, Paper, Stack, Typography } from '@mui/material';
import { type ReactElement } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { ROUTES } from '@config/routes';

function HomePage(): ReactElement {
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Paper elevation={2} sx={{ p: 4, textAlign: 'center' }}>
          <HomeIcon sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} />
          <Typography variant="h3" component="h1" gutterBottom>
            Welcome to React Boilerplate
          </Typography>
          <Typography variant="h6" color="text.secondary" paragraph>
            A modern, production-ready React application template
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
            This boilerplate includes:
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
            <Typography component="li">TypeScript support</Typography>
            <Typography component="li">React Router DOM</Typography>
            <Typography component="li">Material-UI theming</Typography>
            <Typography component="li">Error boundaries</Typography>
            <Typography component="li">Code splitting with Suspense</Typography>
            <Typography component="li">Axios API client</Typography>
            <Typography component="li">React Query data fetching</Typography>
            <Typography component="li">Feature-first folder structure</Typography>
          </Box>
          <Stack direction="row" justifyContent="center" sx={{ mt: 4 }}>
            <Button
              component={RouterLink}
              to={ROUTES.employees}
              variant="contained"
              color="primary"
              size="large"
            >
              View Employees Feature
            </Button>
          </Stack>
        </Paper>
      </Box>
    </Container>
  );
}

export default HomePage;
