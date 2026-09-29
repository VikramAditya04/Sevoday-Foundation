import { useEffect } from "react";
import AppRoutes from './routes/AppRoutes'
import { initializeAuth } from "./store/authStore";

function App() {
  useEffect(() => {
    initializeAuth();
  }, []);

  return <AppRoutes />
}

export default App
