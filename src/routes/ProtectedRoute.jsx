import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children }) {
  const { isAuthenticated, openAuth } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      openAuth("login");
    }
  }, [isAuthenticated, openAuth]);

  if (!isAuthenticated) {
    return <div className="min-h-screen bg-white" aria-hidden="true" />;
  }

  return children;
}

export default ProtectedRoute;
