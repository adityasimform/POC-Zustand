import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { Tasks } from "./pages/Tasks";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./Layout";
import { useStore } from "./stores/store";
import ProductPage from "./pages/Products";
import Home from "./pages/Home";

function App() {
  const { isLoggedIn } = useStore();
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/auth/login"
          element={isLoggedIn ? <Navigate to="/" replace /> : <LoginPage />}
        />

        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/products" element={<ProductPage />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
