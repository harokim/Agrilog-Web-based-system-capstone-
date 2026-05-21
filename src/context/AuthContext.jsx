import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem("mc41_users");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    const saved = localStorage.getItem("mc41_user");
    if (saved) setUser(JSON.parse(saved));
    setLoading(false);
  }, []);

  const login = (email) => {
    const role = email.includes("engineer") ? "engineer" : "client";

    const existing = users.find(u => u.email === email);

    const newUser = existing || {
      id: Date.now().toString(),
      email,
      role
    };

    setUser(newUser);
    localStorage.setItem("mc41_user", JSON.stringify(newUser));

    if (!existing) {
      const updated = [...users, newUser];
      setUsers(updated);
      localStorage.setItem("mc41_users", JSON.stringify(updated));
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("mc41_user");
  };

  const deleteUser = (id) => {
    const updated = users.filter(u => u.id !== id);
    setUsers(updated);
    localStorage.setItem("mc41_users", JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, loading, users, deleteUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
