import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { TEST_AUTHENTICATED } from "../config/devFlags";
import { DEFAULT_USER_PROFILE, PROFILE_STORAGE_KEYS } from "../data/userProfileData";

const AuthContext = createContext(null);
const AUTH_STORAGE_KEY = "drPetAuthSession";
const LEGACY_AUTH_STORAGE_KEY = "isAuthenticated";
const REMEMBER_LOGIN_DAYS = 30;
const REMEMBER_LOGIN_MS = REMEMBER_LOGIN_DAYS * 24 * 60 * 60 * 1000;

function getStoredAuthSession() {
  const storages = [localStorage, sessionStorage];

  for (const storage of storages) {
    const storedValue = storage.getItem(AUTH_STORAGE_KEY);
    if (!storedValue) continue;

    try {
      const session = JSON.parse(storedValue);
      if (session?.authenticated && (!session.expiresAt || session.expiresAt > Date.now())) {
        return session;
      }
    } catch {
      // Invalid auth data is cleared below.
    }

    storage.removeItem(AUTH_STORAGE_KEY);
  }

  return null;
}

function clearStoredAuthentication() {
  localStorage.removeItem(AUTH_STORAGE_KEY);
  sessionStorage.removeItem(AUTH_STORAGE_KEY);
  localStorage.removeItem(LEGACY_AUTH_STORAGE_KEY);
  localStorage.removeItem("accessToken");
  sessionStorage.removeItem("accessToken");
}

function loadAuthentication(defaultValue) {
  try {
    localStorage.removeItem(LEGACY_AUTH_STORAGE_KEY);
    return Boolean(getStoredAuthSession()) || defaultValue;
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
  const [authExpiresAt, setAuthExpiresAt] = useState(() => {
    try {
      return getStoredAuthSession()?.expiresAt ?? null;
    } catch {
      return null;
    }
  });
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

  const completeLogin = useCallback((profileUpdates = {}, options = {}) => {
    const backendUser = options.user || {};
    const nextProfile = {
      ...profileUpdates,
      ...(backendUser.full_name ? { fullName: backendUser.full_name } : {}),
      ...(backendUser.email ? { email: backendUser.email } : {}),
      ...(backendUser.phone ? { phone: backendUser.phone } : {}),
      ...(backendUser.user_id ? { userId: backendUser.user_id } : {}),
      ...(backendUser.role_code ? { roleCode: backendUser.role_code } : {}),
    };

    if (Object.keys(nextProfile).length > 0) {
      updateUserProfile(nextProfile);
    }

    const remember = Boolean(options.remember);
    const authSession = {
      authenticated: true,
      createdAt: Date.now(),
      expiresAt: remember ? Date.now() + REMEMBER_LOGIN_MS : null,
      remember,
    };

    clearStoredAuthentication();
    const storage = remember ? localStorage : sessionStorage;
    storage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authSession));
    if (options.accessToken) {
      storage.setItem("accessToken", options.accessToken);
    }

    setAuthExpiresAt(authSession.expiresAt);
    setAuthenticated(true);
    setAuthModal(null);
    const pendingAction = pendingAuthAction.current;
    pendingAuthAction.current = null;
    pendingAction?.();
  }, [updateUserProfile]);

  const logout = useCallback(() => {
    pendingAuthAction.current = null;
    clearStoredAuthentication();
    setAuthExpiresAt(null);
    setAuthenticated(false);
    setAuthModal(null);
  }, []);

  useEffect(() => {
    const handleAuthExpired = () => {
      pendingAuthAction.current = null;
      setAuthExpiresAt(null);
      setAuthenticated(false);
      setAuthModal("login");
    };

    window.addEventListener("petclinic:auth-expired", handleAuthExpired);
    return () => window.removeEventListener("petclinic:auth-expired", handleAuthExpired);
  }, []);

  useEffect(() => {
    if (!authenticated || !authExpiresAt) return undefined;

    let timer;
    const scheduleExpiryCheck = () => {
      const delay = authExpiresAt - Date.now();
      if (delay <= 0) {
        logout();
        return;
      }

      timer = window.setTimeout(scheduleExpiryCheck, Math.min(delay, 2_147_483_647));
    };

    scheduleExpiryCheck();
    return () => window.clearTimeout(timer);
  }, [authenticated, authExpiresAt, logout]);

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
