import React, { createContext, useState, ReactNode, useEffect } from "react";

interface User {
  email: string;
  token: string;
}

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider: React.FunctionComponent<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [token]);

  const authContextValue: AuthContextValue = {
    user,
    isAuthenticated,
  };
  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
