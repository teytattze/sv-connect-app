import { useEffect, useState } from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { Navbar, Sidebar, SidebarType } from '@sv-connect/web-ui';
import { Outlet } from 'react-router-dom';
import { AuthGuard } from '../components/auth-guard';
import { routes } from '../lib/routes';

export function DashboardLayout() {
  const theme = useTheme();
  const isMobileScreen = useMediaQuery(theme.breakpoints.down('md'));

  const [sidebarStatus, setSidebarStatus] = useState<SidebarType>(
    SidebarType.DEFAULT,
  );
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

  useEffect(() => {
    if (isMobileScreen) {
      setSidebarStatus(SidebarType.MODAL);
      setIsSidebarOpen(false);
    } else {
      setSidebarStatus(SidebarType.DEFAULT);
      setIsSidebarOpen(true);
    }
  }, [isMobileScreen]);

  const handleSidebarToggle = () => {
    if (isMobileScreen) {
      setIsSidebarOpen((prev) => !prev);
    } else {
      setSidebarStatus((prev) =>
        prev === SidebarType.DEFAULT
          ? SidebarType.MINIMIZE
          : SidebarType.DEFAULT,
      );
    }
  };

  return (
    <AuthGuard>
      <Sidebar
        isOpen={isSidebarOpen}
        routes={routes}
        type={sidebarStatus}
        handleToggle={handleSidebarToggle}
      />
      <Box
        sx={{
          width: `calc(100% - ${sidebarBoxWidthByType[sidebarStatus]})`,
          position: 'relative',
          float: 'right',
        }}
      >
        <Navbar title="Helo" handleToggle={handleSidebarToggle} />
        <Box component="main">
          <Box sx={{ px: 2 }}>
            <Outlet />
          </Box>
        </Box>
      </Box>
    </AuthGuard>
  );
}

const sidebarBoxWidthByType: Record<keyof typeof SidebarType, string> = {
  DEFAULT: '20rem',
  MINIMIZE: '6rem',
  MODAL: '0rem',
};
