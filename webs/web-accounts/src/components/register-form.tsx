import { LoadingButton } from '@mui/lab';
import {
  Alert,
  Box,
  Button,
  Divider,
  Paper,
  Stack,
  TextField,
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { ICreateAccountPayload } from '@sv-connect/domain';
import { FormTitle, LoadingWrapper } from '@sv-connect/web-ui';
import { useState } from 'react';
import { useSnackbar } from 'notistack';
import { Controller, useForm } from 'react-hook-form';
import { Link as RouterLink } from 'react-router-dom';
import { registerValidation, registerValue } from '../lib/register-form.lib';
import { useCreateAccount } from '../hooks/use-create-account.hook';

export function RegisterForm() {
  const [errorMsg, setErrorMsg] = useState<string>('');
  const { enqueueSnackbar } = useSnackbar();
  const {
    handleSubmit,
    control,
    formState: { errors: formErrors },
  } = useForm<ICreateAccountPayload>();

  const { isLoading, mutate: createAccount } = useCreateAccount({
    onSuccess: (res) => {
      if (res.statusCode === 200) {
        enqueueSnackbar('Register successfully', { variant: 'success' });
      } else {
        setErrorMsg(res.message);
      }
    },
  });

  return (
    <Paper sx={{ p: 5, mx: 'auto', width: '100%', maxWidth: '500px' }}>
      <LoadingWrapper loading={isLoading}>
        <FormTitle title="Sign Up" />
        <form
          onSubmit={handleSubmit(({ email, password }: ICreateAccountPayload) =>
            createAccount({ email, password }),
          )}
        >
          <Box sx={{ my: 5 }}>
            <Stack direction="column" spacing={2.5}>
              {!!errorMsg && <Alert severity="error">{errorMsg}</Alert>}
              <Controller
                name="email"
                control={control}
                defaultValue={registerValue.email}
                rules={registerValidation.email}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Email"
                    variant="outlined"
                    helperText={formErrors.email?.message}
                    error={!!formErrors.email}
                  />
                )}
              />
              <Controller
                name="password"
                control={control}
                defaultValue={registerValue.password}
                rules={registerValidation.password}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="password"
                    label="Password"
                    variant="outlined"
                    helperText={formErrors.password?.message}
                    error={!!formErrors.password}
                  />
                )}
              />
            </Stack>
          </Box>
          <LoadingButton
            type="submit"
            variant="contained"
            loading={false}
            fullWidth
            disableElevation
          >
            Sign Up
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
          HAVE ACCOUNT?
        </Divider>
        <Button
          component={RouterLink}
          to="/login"
          variant="text"
          endIcon={<ArrowForwardIcon />}
          fullWidth
          disableElevation
        >
          Sign In Now
        </Button>
      </LoadingWrapper>
    </Paper>
  );
}
