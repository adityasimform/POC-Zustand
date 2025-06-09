// src/router.tsx
import { createBrowserRouter } from 'react-router';
import ProtectedRoute from './components/ProtectedRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <h1>Home Page</h1>,
    children: [
      {
        path: 'auth',
        element: <h1>Auth Layout</h1>,
        children: [
          {
            path: 'login',
            element: <h1>Login Page</h1>,
          },
        ],
      },
      {
        element: <ProtectedRoute />, // 🔐 Guarded routes
        children: [
          {
            index: true,
            element: <h2>Dashboard Page</h2>,
          },
        ],
      },
    ],
  },
]);
