import { createContext, useContext, useMemo } from "react";
import { TEST_AUTHENTICATED } from "../config/devFlags";

const AuthContext = createContext(null);

export function AuthProvider({ children, isAuthenticated = TEST_AUTHENTICATED }) {
  const value = useMemo(
    () => ({
      isAuthenticated,
    }),
    [isAuthenticated],
  );

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}

export default AuthContext;
