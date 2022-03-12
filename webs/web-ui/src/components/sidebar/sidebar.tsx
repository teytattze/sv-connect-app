import * as React from 'react';
import { Box, Divider, Paper, Stack, Typography } from '@mui/material';
import { useWindowSize } from '../../hooks/use-window-size';
import { SidebarSection } from './sidebar-section';
import { IRoute } from '../../interfaces/routes.interface';

export interface SidebarProps {
  routes: IRoute[];
}

export function Sidebar({ routes }: SidebarProps) {
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
}
