import React, { createRef } from 'react';
import { SnackbarProvider as NotistackProvider } from 'notistack';

export interface SnackbarProviderProps {
  children: React.ReactNode;
}

export function SnackbarProvider({ children }: SnackbarProviderProps) {
  const notistackRef = createRef<NotistackProvider>();
  return (
    <NotistackProvider
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      autoHideDuration={3000}
      disableWindowBlurListener
      maxSnack={3}
      preventDuplicate
      ref={notistackRef}
    >
      {children}
    </NotistackProvider>
  );
}
