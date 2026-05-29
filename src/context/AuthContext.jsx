import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import instance from "../instances/instance";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔥 check session from cookie on refresh
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await instance.get("auth/getme", {
          withCredentials: true, 
        });

        setUser(res.data);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // login just sets state (cookie already handled by backend)
  const login = (userData) => {
    setUser(userData);
  };

  const logout = async () => {
    await instance.post("/logout", {}, {
      withCredentials: true,
    });

    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);