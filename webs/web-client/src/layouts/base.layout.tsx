import * as React from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { Sidebar } from '../components/sidebar';
import { Navbar } from '../components/navbar';

export interface BaseLayoutProps {
  children: React.ReactNode;
}

export const BaseLayout = ({ children }: BaseLayoutProps) => {
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
        <Navbar />
      </Box>
      <Sidebar />
      <Box>{children}</Box>
    </Box>
  );
};

const enum SidebarStatus {
  HIDDEN,
  SMALL,
  DEFAULT,
}
