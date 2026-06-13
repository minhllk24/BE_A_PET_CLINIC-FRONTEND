import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";
import { TEST_AUTHENTICATED } from "../config/devFlags";
import { DEFAULT_USER_PROFILE, PROFILE_STORAGE_KEYS } from "../data/userProfileData";

const AuthContext = createContext(null);
const AUTH_STORAGE_KEY = "isAuthenticated";

function loadAuthentication(defaultValue) {
  try {
    const storedValue = localStorage.getItem(AUTH_STORAGE_KEY);
    return storedValue === null ? defaultValue : storedValue === "true";
  } catch {
    return defaultValue;
  }
}

function loadUserProfile() {
  try {
    const storedProfile = localStorage.getItem(PROFILE_STORAGE_KEYS.profile);
    return storedProfile ? JSON.parse(storedProfile) : DEFAULT_USER_PROFILE;
  } catch {
    return DEFAULT_USER_PROFILE;
  }
}

export function AuthProvider({ children, isAuthenticated = TEST_AUTHENTICATED }) {
  const [authenticated, setAuthenticated] = useState(() => loadAuthentication(isAuthenticated));
  const [authModal, setAuthModal] = useState(null);
  const [userProfile, setUserProfile] = useState(loadUserProfile);
  const pendingAuthAction = useRef(null);

  const openAuth = useCallback((screen = "login") => setAuthModal(screen), []);
  const closeAuth = useCallback(() => {
    pendingAuthAction.current = null;
    setAuthModal(null);
  }, []);

  const requireAuth = useCallback((onAuthenticated) => {
    if (authenticated) {
      onAuthenticated?.();
      return true;
    }
    pendingAuthAction.current = onAuthenticated ?? null;
    setAuthModal("login");
    return false;
  }, [authenticated]);

  const updateUserProfile = useCallback((updates) => {
    setUserProfile((current) => {
      const nextProfile = { ...current, ...updates };
      localStorage.setItem(PROFILE_STORAGE_KEYS.profile, JSON.stringify(nextProfile));
      return nextProfile;
    });
  }, []);

  const completeLogin = useCallback((profileUpdates = {}) => {
    if (Object.keys(profileUpdates).length > 0) {
      updateUserProfile(profileUpdates);
    }
    localStorage.setItem(AUTH_STORAGE_KEY, "true");
    setAuthenticated(true);
    setAuthModal(null);
    const pendingAction = pendingAuthAction.current;
    pendingAuthAction.current = null;
    pendingAction?.();
  }, [updateUserProfile]);

  const logout = useCallback(() => {
    pendingAuthAction.current = null;
    localStorage.removeItem(AUTH_STORAGE_KEY);
    setAuthenticated(false);
    setAuthModal(null);
  }, []);

  const value = useMemo(
    () => ({
      isAuthenticated: authenticated,
      authModal,
      userProfile,
      openAuth,
      closeAuth,
      requireAuth,
      completeLogin,
      logout,
      updateUserProfile,
    }),
    [
      authenticated,
      authModal,
      userProfile,
      openAuth,
      closeAuth,
      requireAuth,
      completeLogin,
      logout,
      updateUserProfile,
    ],
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
