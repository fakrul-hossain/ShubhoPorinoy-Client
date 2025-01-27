import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import './app.css';
import { RouterProvider } from 'react-router-dom';
import myCreateRoute from './Router/Router';
import AuthProvider from './providers/AuthProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { ThemeProvider } from "@material-tailwind/react";

// Create an instance of QueryClient before using it
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <QueryClientProvider client={queryClient}> {/* Use the queryClient instance here */}
        <AuthProvider>
          <RouterProvider router={myCreateRoute} />
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </React.StrictMode>
);
