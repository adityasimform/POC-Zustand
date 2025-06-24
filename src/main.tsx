import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ThemeWatcher } from "./HOC/ThemeWatcher.tsx";
import { Toaster } from "sonner";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeWatcher />
    <App />
    <Toaster richColors position="top-right" />
  </StrictMode>
);
