import { Box, CircularProgress, Typography, type SxProps, type Theme } from '@mui/material';
import { type ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

interface PageLoaderProps {
  message?: string;
  fullScreen?: boolean;
}

function PageLoader({ message, fullScreen = true }: PageLoaderProps): ReactElement {
  const { t } = useTranslation();
  const displayMessage = message ?? t('common.loading');
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
      {displayMessage && (
        <Typography variant="body1" color="text.secondary">
          {displayMessage}
        </Typography>
      )}
    </Box>
  );
}

export default PageLoader;
