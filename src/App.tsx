import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { Dashboard } from "./pages/Dashboard";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuthStore } from "./stores/authStore";
import Layout from "./Layout";

function App() {
  const { isLoggedIn } = useAuthStore();
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/auth/login"
          element={isLoggedIn ? <Navigate to="/" replace /> : <LoginPage />}
        />

        <Route element={<ProtectedRoute />}>
         <Route element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
