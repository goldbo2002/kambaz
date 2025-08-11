// src/App.tsx
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { currentUser as fetchCurrentUser } from "./Kambaz/Account/client";

// TODO: update these imports to your real pages/routes
import Dashboard from "./Kambaz/Dashboard";
import Signup from "./Kambaz/Account/Signup";
import Signin from "./Kambaz/Account/Signin";
// import Profile from "./Kambaz/Account/Profile"; // if you have one

// ---------- Auth Context ----------
export type AuthUser = {
  _id: string;
  username: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  role?: string;
} | null;

type AuthContextType = {
  user: AuthUser;
  setUser: (u: AuthUser) => void;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  loading: true,
});

export const useAuth = () => useContext(AuthContext);

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetchCurrentUser()
      .then((u) => {
        if (!cancelled) {
          setUser(u);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setUser(null);
          setLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const value = useMemo(() => ({ user, setUser, loading }), [user, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// ---------- App ----------
export default function App() {
  return (
    <HashRouter>
      <AuthProvider>
        {/* If you have a header that shows auth state, render it here */}
        <Routes>
          <Route path="/" element={<Navigate to="/Kambaz/Dashboard" replace />} />
          <Route path="/Kambaz/Dashboard" element={<Dashboard />} />
          <Route path="/Kambaz/Account/Signup" element={<Signup />} />
          <Route path="/Kambaz/Account/Signin" element={<Signin />} />
          {/* <Route path="/Kambaz/Account/Profile" element={<Profile />} /> */}
          {/* add the rest of your routes here */}
        </Routes>
      </AuthProvider>
    </HashRouter>
  );
}
