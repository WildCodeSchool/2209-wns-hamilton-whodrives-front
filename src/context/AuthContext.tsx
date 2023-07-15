import { gql } from "@apollo/client";
import React, { createContext, ReactNode, useReducer } from "react";
// import { toast } from "react-toastify";

interface ISetUserInfos {
  email: string;
  username: string;
  token: string;
}
interface IAuthContext {
  setUserInfos(data: ISetUserInfos): Promise<void>;
  logout(): void;
  userInfos: {
    email: string;
    username: string;
  };
}

export const AuthContext = createContext({} as IAuthContext);

export const CHECK_USER_LOGGED = gql`
query CheckUserLogged {
  checkUserLogged {
    msg
  }
}
`;

export const AuthProvider: React.FunctionComponent<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(
    (prevState: any, action: any) => {
      switch (action.type) {
        case "LOG_IN":
          return {
            ...prevState,
            userInfos: action.userInfos,
          };
        case "LOG_OUT":
          return {
            ...prevState,
            userInfos: {},
          };
      }
    },
    {
      userInfos: JSON.parse(`${localStorage.getItem("userInfos")}`) || {},
    }
  );



  const authContextValue = {
    setUserInfos: async (data: ISetUserInfos) => {
      const { token, ...userInfos } = data;
      localStorage.setItem("token", token);
      localStorage.setItem("userInfos", JSON.stringify(userInfos));
      dispatch({ type: "LOG_IN", userInfos });
    },
    logout: () => {
      localStorage.removeItem("token");
      localStorage.removeItem("userInfos");
      dispatch({ type: "LOG_OUT" });
    },
    userInfos: { ...state.userInfos },
  };
  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
