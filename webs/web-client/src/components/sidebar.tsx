import * as React from 'react';
import {
  Box,
  Divider,
  ListItemButton,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { IPath, IRoute, routes } from '../lib/routes';
import { useWindowSize } from '../hooks/use-window-size';

export const Sidebar = () => {
  const { height } = useWindowSize();

  return (
    <Box
      sx={{
        height: '100vh',
        width: '20rem',
        position: 'fixed',
      }}
    >
      <Paper
        sx={{
          mt: 2,
          ml: 2,
          mb: 2,
          p: 2,
          height: `calc(${height}px - 2rem)`,
        }}
      >
        <Stack
          justifyItems="center"
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
              sx={{ width: '16rem', mx: 'auto', alignSelf: 'center' }}
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
    </Box>
  );
};

export interface SidebarSectionProps {
  route: IRoute;
}

export const SidebarSection = ({ route }: SidebarSectionProps) => {
  return (
    <Stack
      direction="column"
      alignItems="justify-start"
      spacing={1}
      sx={{
        width: '100%',
        px: 1,
      }}
    >
      <Typography
        variant="caption"
        component="h2"
        sx={{
          color: 'text.secondary',
          fontWeight: 700,
          textTransform: 'uppercase',
        }}
      >
        {route.group}
      </Typography>
      <Stack direction="column" alignItems="justify-start" spacing={0.5}>
        {route.paths.map((path) => (
          <SidebarButton key={path.name} path={path} />
        ))}
      </Stack>
    </Stack>
  );
};

export interface SidebarButtonProps {
  path: IPath;
}

export const SidebarButton = ({ path }: SidebarButtonProps) => {
  return (
    <ListItemButton
      sx={{
        borderRadius: 1,
        p: 0,
      }}
    >
      <Stack
        sx={{
          p: 1,
          mr: 1,
        }}
      >
        {path.Icon}
      </Stack>
      <ListItemText primary={path.name} />
    </ListItemButton>
  );
};
