import { LoadingButton } from '@mui/lab';
import {
  Alert,
  Box,
  Button,
  Divider,
  Link,
  Paper,
  Stack,
  TextField,
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { ILoginPayload } from '@sv-connect/domain';
import { FormTitle, LoadingWrapper } from '@sv-connect/web-ui';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { loginValidation, loginValue } from '../lib/login-form.lib';
import { useLogin } from '../hooks/use-login.hook';

export function LoginForm() {
  const [errorMsg, setErrorMsg] = useState<string>('');

  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    formState: { errors: formErrors },
  } = useForm<ILoginPayload>();

  const { isLoading, mutate: login } = useLogin({
    onError: () => {
      setErrorMsg('There is something unexpected happened');
    },
    onSuccess: (res) => {
      if (res.statusCode === 200) {
        enqueueSnackbar('Login successfully', { variant: 'success' });
        navigate('/dashboard');
      } else {
        setErrorMsg(res.message);
      }
    },
  });

  return (
    <Paper
      sx={{
        p: 5,
        mx: 'auto',
        width: '100%',
        maxWidth: '520px',
      }}
    >
      <LoadingWrapper loading={isLoading}>
        <FormTitle title="Login" />
        <form onSubmit={handleSubmit((payload) => login(payload))}>
          <Box sx={{ my: 5 }}>
            <Stack direction="column" spacing={2.5}>
              {!!errorMsg && <Alert severity="error">{errorMsg}</Alert>}
              <Controller
                name="email"
                control={control}
                defaultValue={loginValue.email}
                rules={loginValidation.email}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="email"
                    label="E-mail"
                    variant="outlined"
                    helperText={formErrors.email?.message}
                    error={!!formErrors.email}
                  />
                )}
              />
              <Controller
                name="password"
                control={control}
                defaultValue={loginValue.password}
                rules={loginValidation.password}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="password"
                    type="password"
                    label="Password"
                    variant="outlined"
                    helperText={formErrors.password?.message}
                    error={!!formErrors.password}
                  />
                )}
              />
            </Stack>
            <Box sx={{ textAlign: 'right' }}>
              <Link
                component={RouterLink}
                to="/forgot-password"
                variant="caption"
                sx={{
                  color: 'text.secondary',
                  p: 0.5,
                  cursor: 'pointer',
                  ':hover': {
                    color: 'text.primary',
                  },
                  textDecoration: 'none',
                }}
              >
                Forgot Password?
              </Link>
            </Box>
          </Box>
          <LoadingButton
            type="submit"
            variant="contained"
            loading={isLoading}
            fullWidth
            disableElevation
          >
            Sign In
          </LoadingButton>
        </form>
        <Divider
          sx={{
            my: 2.5,
            color: 'text.disabled',
            fontWeight: 500,
            fontSize: 'caption.fontSize',
          }}
        >
          NO ACCOUNT?
        </Divider>
        <Button
          component={RouterLink}
          to="/register"
          variant="text"
          endIcon={<ArrowForwardIcon />}
          fullWidth
          disableElevation
        >
          Sign Up Now
        </Button>
      </LoadingWrapper>
    </Paper>
  );
}
