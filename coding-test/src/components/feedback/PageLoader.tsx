import { Box, CircularProgress, Typography, type SxProps, type Theme } from '@mui/material';
import { type ReactElement } from 'react';

interface PageLoaderProps {
  message?: string;
  fullScreen?: boolean;
}

function PageLoader({ message = 'Loading...', fullScreen = true }: PageLoaderProps): ReactElement {
  const containerStyles: SxProps<Theme> = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 2,
    ...(fullScreen
      ? {
          minHeight: '100vh',
        }
      : {
          padding: 4,
        }),
  };

  return (
    <Box sx={containerStyles}>
      <CircularProgress size={48} />
      {message && (
        <Typography variant="body1" color="text.secondary">
          {message}
        </Typography>
      )}
    </Box>
  );
}

export default PageLoader;
