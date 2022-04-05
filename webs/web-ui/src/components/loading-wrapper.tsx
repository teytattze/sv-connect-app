import React from 'react';
import { Box } from '@mui/material';

export interface LoadingWrapperProps {
  loading?: boolean;
  type?: 'skeleton' | 'disable';
  renderSkeleton?: () => React.ReactElement | null;
  children: React.ReactNode;
}

export function LoadingWrapper({
  loading = false,
  type = 'disable',
  renderSkeleton,
  children,
}: LoadingWrapperProps) {
  if (type === 'skeleton' && renderSkeleton && loading) {
    return renderSkeleton();
  }

  return (
    <Box
      sx={{
        pointerEvents: loading ? 'none' : 'auto',
        opacity: loading ? 0.74 : 1,
      }}
    >
      {children}
    </Box>
  );
}
