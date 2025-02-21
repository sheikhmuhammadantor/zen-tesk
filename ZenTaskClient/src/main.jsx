import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/Routes';
import AuthProvider from './providers/AuthProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
// import 'react-date-range/dist/styles.css';
// import 'react-date-range/dist/theme/default.css';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <Toaster position='top-right' reverseOrder={false} />
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  </StrictMode>
)
