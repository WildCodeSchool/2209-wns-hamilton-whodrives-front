import { gql, useLazyQuery } from '@apollo/client';
import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { toast } from 'react-toastify';

interface AuthContextValue {
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider: React.FunctionComponent<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const token = localStorage.getItem('token');

  const CHECK_USER_LOGGED = gql`
    query CheckUserLogged {
      checkUserLogged {
        msg
      }
    }
  `;

  const [checkUserLoggedQuery, { error, data }] = useLazyQuery(CHECK_USER_LOGGED, {
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  useEffect(() => {
    if (token) {
      checkUserLoggedQuery();
    } else {
      setIsAuthenticated(false);
    }
  }, [token, checkUserLoggedQuery]);

  useEffect(() => {
    if (data && data.checkUserLogged) {
      const { msg } = data.checkUserLogged;
      setIsAuthenticated(msg); // Affiche une alerte avec le résultat
    }else if(error){
      toast.error("Une erreur s'est produite lors de la connexion. Veuillez réessayer.");
      setIsAuthenticated(false);
    }
  }, [data]);



  const authContextValue: AuthContextValue = {
    isAuthenticated,
  };

  return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>;
};
