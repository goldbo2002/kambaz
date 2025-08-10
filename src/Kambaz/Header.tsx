import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// session storage keys
const CURRENT_KEY = "kambaz-current-user-id";
const USERS_KEY = "kambaz-users";

// simple user type
type User = {
  id: string;
  username: string;
  role?: string;
};

function loadCurrentUserId(): string | null {
  return localStorage.getItem(CURRENT_KEY);
}
function clearCurrentUser() {
  localStorage.removeItem(CURRENT_KEY);
}
function loadUsers(): User[] {
  const s = localStorage.getItem(USERS_KEY);
  return s ? JSON.parse(s) : [];
}

export default function Header() {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [currentId, setCurrentId] = useState<string | null>(null);

  useEffect(() => {
    setUsers(loadUsers());
    setCurrentId(loadCurrentUserId());
  }, []);

  // keep user in sync if other tabs change it
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === CURRENT_KEY || e.key === USERS_KEY) {
        setUsers(loadUsers());
        setCurrentId(loadCurrentUserId());
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const user = useMemo(
    () => users.find(u => u.id === currentId) || null,
    [users, currentId]
  );

  const signOut = () => {
    clearCurrentUser();
    setCurrentId(null);
    navigate("/Kambaz/Account/Signin");
  };

  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "12px 16px",
      borderBottom: "1px solid #ddd",
      background: "#fafafa"
    }}>
      <div>
        <Link to="/Kambaz/Dashboard" style={{ textDecoration: "none", fontWeight: 600 }}>
          Kambaz
        </Link>
      </div>
      <div style={{ fontSize: 14 }}>
        {user ? (
          <>
            <span style={{ marginRight: 12 }}>
              Signed in as <b>{user.username}</b>{user.role ? ` (${user.role})` : ""}
            </span>
            <Link to="/Kambaz/Account/Profile" style={{ marginRight: 12 }}>
              Profile
            </Link>
            <button onClick={signOut}>Sign out</button>
          </>
        ) : (
          <>
            <span style={{ marginRight: 12 }}>Not signed in</span>
            <Link to="/Kambaz/Account/Signin" style={{ marginRight: 8 }}>Sign in</Link>
            <Link to="/Kambaz/Account/Signup">Sign up</Link>
          </>
        )}
      </div>
    </div>
  );
}
