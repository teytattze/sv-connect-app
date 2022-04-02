import React from 'react';
import { CssBaseline, ThemeProvider, muiTheme } from '@sv-connect/web-ui';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { DashboardLayout } from './layouts/dashboard-layout';

export function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={muiTheme}>
        <CssBaseline />
        <Routes>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<h2>This is dashboard</h2>} />
          </Route>
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}
