import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { currentUser as fetchCurrentUser } from "./Kambaz/Account/client";

import Dashboard from "./Kambaz/Dashboard";
import Signup from "./Kambaz/Account/Signup";
import Signin from "./Kambaz/Account/Signin";
import Users from "./Kambaz/Users";
import Labs from "./Labs";

export type AuthUser = {
  _id: string;
  username: string;
  firstName?: string;
  lastName?: string;
  role?: string;
  email?: string;
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
      .then((me) => { if (!cancelled) { setUser(me); setLoading(false); } })
      .catch(() => { if (!cancelled) { setUser(null); setLoading(false); } });
    return () => { cancelled = true; };
  }, []);

  const value = useMemo(() => ({ user, setUser, loading }), [user, loading]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default function App() {
  return (
    <HashRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/Kambaz/Dashboard" replace />} />
          <Route path="/Kambaz/Dashboard" element={<Dashboard />} />
          <Route path="/Kambaz/Users" element={<Users />} />
          <Route path="/Kambaz/Account/Signup" element={<Signup />} />
          <Route path="/Kambaz/Account/Signin" element={<Signin />} />
          <Route path="/Labs/*" element={<Labs />} />
        </Routes>
      </AuthProvider>
    </HashRouter>
  );
}
