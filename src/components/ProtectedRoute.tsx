import { Navigate, Outlet } from "react-router";
import { useStore } from "../stores/store";

const ProtectedRoute = () => {
  const isLoggedIn  = useStore(state => state.isLoggedIn);
  return isLoggedIn ? <Outlet /> : <Navigate to="/auth/login" replace />;
};

export default ProtectedRoute;
