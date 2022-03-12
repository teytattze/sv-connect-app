import * as React from 'react';
import {
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';

export const LoginForm = () => {
  return (
    <Stack
      direction="column"
      spacing={4}
      sx={{
        width: '100%',
        my: 8,
        p: 2,
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        sx={{
          fontWeight: 600,
        }}
      >
        SV CONNECT
      </Typography>
      <Paper
        sx={{
          width: '100%',
          maxWidth: '512px',
          mx: 'auto',
          p: 6,
        }}
      >
        <Stack
          direction="column"
          alignItems="flex-start"
          spacing={2}
          sx={{
            width: '100%',
          }}
        >
          <TextField id="email" label="E-mail" variant="outlined" fullWidth />
          <TextField
            id="password"
            label="Password"
            variant="outlined"
            fullWidth
          />
          <FormControlLabel
            control={
              <Checkbox disableTouchRipple size="small" color="primary" />
            }
            label="Remember Me"
            sx={{
              transform: 'translate(-8px, -8px)',
            }}
          />
          <Button variant="contained" color="primary" fullWidth>
            Login
          </Button>
          <Divider
            flexItem
            sx={{
              typography: 'caption',
              color: 'text.disabled',
            }}
          >
            NO ACCOUNT?
          </Divider>
          <Button
            variant="text"
            color="primary"
            fullWidth
            endIcon={<ArrowForwardRoundedIcon />}
          >
            Create an Account
          </Button>
        </Stack>
      </Paper>
    </Stack>
  );
};
