import { RegisterPage } from '@sv-connect/web-accounts';
import { AuthGuard, AuthProvider, LoginPage } from '@sv-connect/web-auth';
import {
  CssBaseline,
  SnackbarProvider,
  ThemeProvider,
  muiTheme,
} from '@sv-connect/web-ui';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { DashboardLayout } from './layouts/dashboard-layout';
import { DefaultLayout } from './layouts/default-layout';

const queryClient = new QueryClient();

export function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <ThemeProvider theme={muiTheme}>
          <CssBaseline />
          <SnackbarProvider>
            <AuthProvider>
              <Routes>
                <Route path="/" element={<DefaultLayout />}>
                  <Route index element={<LoginPage />} />
                  <Route path="login" element={<LoginPage />} />
                  <Route path="register" element={<RegisterPage />} />
                </Route>
                <Route path="/dashboard" element={<DashboardLayout />}>
                  <Route index element={<h2>This is dashboard</h2>} />
                </Route>
              </Routes>
            </AuthProvider>
          </SnackbarProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}
