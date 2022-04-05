import { Box, Divider, Drawer, Paper, Stack, Typography } from '@mui/material';
import { SidebarSection, SidebarSectionMinimize } from './sidebar-section';
import { useWindowSize } from '../../hooks/use-window-size.hook';
import { IRoute } from '../../interfaces/routes.interface';

export enum SidebarType {
  DEFAULT = 'DEFAULT',
  MINIMIZE = 'MINIMIZE',
  MODAL = 'MODAL',
}

export interface SidebarProps {
  isOpen: boolean;
  routes: IRoute[];
  type: SidebarType;
  handleToggle: () => void;
}

export function Sidebar({ isOpen, routes, type, handleToggle }: SidebarProps) {
  const { height } = useWindowSize();

  if (type === SidebarType.MODAL)
    return (
      <SidebarModal
        isOpen={isOpen}
        routes={routes}
        type={type}
        handleToggle={handleToggle}
      />
    );

  return (
    <Box
      sx={{
        height: '100vh',
        width: sidebarWidthByType[type],
        position: 'fixed',
      }}
    >
      <Paper
        sx={{
          mt: 2,
          ml: 2,
          mb: 2,
          py: 2,
          px: type === SidebarType.DEFAULT ? 2 : 1,
          height: `calc(${height}px - 2rem)`,
        }}
      >
        <Stack
          justifyContent="center"
          sx={{
            height: 40,
            width: '100%',
          }}
        >
          {type === SidebarType.DEFAULT ? (
            <Typography
              variant="h6"
              component="h1"
              sx={{
                width: '100%',
                fontWeight: 600,
                textAlign: 'center',
              }}
            >
              SV Connect
            </Typography>
          ) : (
            <Typography
              variant="h6"
              component="h1"
              sx={{
                width: '100%',
                fontWeight: 600,
                textAlign: 'center',
                mb: 0,
              }}
            >
              SV
            </Typography>
          )}
        </Stack>
        <Divider
          sx={{
            my: 2,
          }}
        />
        <Stack
          direction="column"
          divider={
            <Divider
              flexItem
              sx={{
                width: type === SidebarType.DEFAULT ? '16rem' : '100%',
                mx: 'auto',
                alignSelf: 'center',
              }}
            />
          }
          spacing={2.5}
          sx={{
            width: '100%',
          }}
        >
          {routes.map((route) =>
            type === SidebarType.DEFAULT ? (
              <SidebarSection key={route.group} route={route} />
            ) : (
              <SidebarSectionMinimize key={route.group} route={route} />
            ),
          )}
        </Stack>
      </Paper>
    </Box>
  );
}

export function SidebarModal({ isOpen, routes, handleToggle }: SidebarProps) {
  const { height } = useWindowSize();

  return (
    <Drawer
      anchor="left"
      open={isOpen}
      variant="temporary"
      onClose={handleToggle}
    >
      <Paper
        sx={{
          mt: 2,
          ml: 2,
          mb: 2,
          py: 2,
          px: 2,
          height: `calc(${height}px - 2rem)`,
        }}
      >
        <Stack
          justifyContent="center"
          sx={{
            height: 40,
            width: '100%',
          }}
        >
          <Typography
            variant="h6"
            component="h1"
            sx={{
              width: '100%',
              fontWeight: 600,
              textAlign: 'center',
            }}
          >
            SV Connect
          </Typography>
        </Stack>
        <Divider
          sx={{
            my: 2,
          }}
        />
        <Stack
          direction="column"
          divider={
            <Divider
              flexItem
              sx={{
                width: '16rem',
                mx: 'auto',
                alignSelf: 'center',
              }}
            />
          }
          spacing={2.5}
          sx={{
            width: '100%',
          }}
        >
          {routes.map((route) => (
            <SidebarSection key={route.group} route={route} />
          ))}
        </Stack>
      </Paper>
    </Drawer>
  );
}

const sidebarWidthByType: Record<keyof typeof SidebarType, string> = {
  DEFAULT: '20rem',
  MINIMIZE: '6rem',
  MODAL: '20rem',
};
