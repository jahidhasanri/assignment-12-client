import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { RouterProvider } from 'react-router-dom';
import { router } from './Router/Router.jsx';

import { HelmetProvider } from 'react-helmet-async';
import AuthProvider from './Provider/AuthProvider.jsx';

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <HelmetProvider>
      <StrictMode>
        <RouterProvider router={router} />
      </StrictMode>
    </HelmetProvider>
  </AuthProvider>
);
