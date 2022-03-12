import * as React from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { Navbar, Sidebar } from '@sv-connect/web-ui';
import { routes } from '../lib/routes';

export interface BaseLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: BaseLayoutProps) {
  const theme = useTheme();
  const isMobileScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [sidebarStatus, setSidebarStatus] = React.useState<SidebarStatus>(
    SidebarStatus.DEFAULT,
  );

  const sidebarWidth = (status: SidebarStatus) => {
    switch (status) {
      case SidebarStatus.DEFAULT:
        return '20rem';
      case SidebarStatus.SMALL:
        return '6rem';
      case SidebarStatus.HIDDEN:
        return '0rem';
      default:
        return '0rem';
    }
  };

  return (
    <Box
      sx={{
        position: 'relative',
      }}
    >
      <Box
        sx={{
          width: `calc(100% - ${sidebarWidth(sidebarStatus)})`,
          position: 'fixed',
          right: 0,
        }}
      >
        <Navbar title="Helo" />
        <Box>{children}</Box>
      </Box>
      <Sidebar routes={routes} />
    </Box>
  );
}

const enum SidebarStatus {
  HIDDEN,
  SMALL,
  DEFAULT,
}
