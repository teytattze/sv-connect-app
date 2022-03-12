import * as React from 'react';
import { IconButton, Paper, Stack, Typography } from '@mui/material';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import NotesRoundedIcon from '@mui/icons-material/NotesRounded';
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';

export const Navbar = () => {
  return (
    <nav>
      <Paper
        elevation={1}
        sx={{
          m: 2,
          p: 2,
        }}
      >
        <Stack justifyContent="space-between">
          <Stack spacing={2}>
            <IconButton size="small">
              <NotesRoundedIcon />
            </IconButton>
            <Typography variant="h6" component="h1" fontWeight={600}>
              Page Title
            </Typography>
          </Stack>
          <Stack spacing={1}>
            <IconButton size="small">
              <AccountCircleRoundedIcon />
            </IconButton>
            <IconButton>
              <NotificationsNoneRoundedIcon />
            </IconButton>
            <IconButton size="small">
              <LogoutRoundedIcon />
            </IconButton>
          </Stack>
        </Stack>
      </Paper>
    </nav>
  );
};
