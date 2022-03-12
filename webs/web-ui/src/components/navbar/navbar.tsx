import * as React from 'react';
import { IconButton, Paper, Stack, Typography } from '@mui/material';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import NotesRoundedIcon from '@mui/icons-material/NotesRounded';
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';

export interface NavbarProps {
  title: string;
}

export function Navbar({ title }: NavbarProps) {
  return (
    <nav>
      <Paper
        elevation={1}
        sx={{
          m: 2,
          p: 2,
        }}
      >
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
        >
          <Stack alignItems="center" direction="row" spacing={2}>
            <IconButton size="small">
              <NotesRoundedIcon />
            </IconButton>
            <Typography variant="h6" component="h1" fontWeight={600}>
              {title}
            </Typography>
          </Stack>
          <Stack alignItems="center" direction="row" spacing={1}>
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
}
