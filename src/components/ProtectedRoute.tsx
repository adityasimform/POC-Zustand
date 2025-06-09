// src/components/ProtectedRoute.tsx
import { Navigate, Outlet } from 'react-router';
import { useAuthStore } from '../stores/authStore';

const ProtectedRoute = () => {
    const { isLoggedIn } = useAuthStore();
  console.log('ProtectedRoute — isLoggedIn:', isLoggedIn); // 🐛
  return isLoggedIn ? <Outlet /> : <Navigate to="/auth/login" replace />;
};

export default ProtectedRoute;
