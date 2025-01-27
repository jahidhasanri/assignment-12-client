
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './Router/Router.jsx';
import { HelmetProvider } from 'react-helmet-async';
import AuthProvider from './Provider/AuthProvider.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
const queryClient = new QueryClient();
createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <HelmetProvider>
    <QueryClientProvider client={queryClient}>

      
        <RouterProvider router={router} />
        <ToastContainer />
    </QueryClientProvider>
    </HelmetProvider>
  </AuthProvider>
);
